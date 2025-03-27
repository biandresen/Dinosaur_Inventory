import { pool } from "./pool.js";
const dinosaurTable = "dinosaur";
const categoryTable = "category";

export const db = {
  selectDinos: async (filter) => {
    let queryText = `SELECT * FROM ${dinosaurTable}`;
    const queryParams = [];

    if (filter && Object.keys(filter).length !== 0) {
      queryText = `SELECT ${dinosaurTable} . * FROM ${dinosaurTable} JOIN ${categoryTable} ON ${dinosaurTable}.${filter.key}_id = ${categoryTable}.id WHERE ${categoryTable}.name ILIKE $1`;
      queryParams.push(`${filter.value}`); // Add % to handle partial matching with ILIKE
    }

    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows;
    } catch (error) {
      console.error("Error in query:", error);
      throw error;
    }
  },
  selectDinoById: async (id) => {
    const queryText = `
      SELECT d.*,
             p.name AS period_name,
             di.name AS diet_name,
             c.name AS class_name,
             h.name AS habitat_name
      FROM ${dinosaurTable} d
      LEFT JOIN ${categoryTable} p ON d.period_id = p.id
      LEFT JOIN ${categoryTable} di ON d.diet_id = di.id
      LEFT JOIN ${categoryTable} c ON d.class_id = c.id
      LEFT JOIN ${categoryTable} h ON d.habitat_id = h.id
      WHERE d.id = $1
    `;
    const queryParams = [id];
    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return null; // Or handle error if dino not found
    }

    const dino = result.rows[0];
    return {
      id,
      name: dino.name,
      description: dino.description,
      weight_kg: dino.weight_kg,
      height_m: dino.height_m,
      period: dino.period_name,
      diet: dino.diet_name,
      class: dino.class_name,
      habitat: dino.habitat_name,
      img_url: dino.img_url,
    };
  },
  insertDino: async (dino) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Start transaction

      const queryText = `
            INSERT INTO dinosaur
            (name, description, weight_kg, height_m, period_id, diet_id, class_id, habitat_id, img_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
      const queryParams = [
        dino.name,
        dino.description,
        dino.weight,
        dino.height,
        dino.period_id,
        dino.diet_id,
        dino.class_id,
        dino.habitat_id,
        dino.img_url,
      ];

      const result = await client.query(queryText, queryParams);
      await client.query("COMMIT"); // Commits transaction

      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback inserted data so the data isn't inconsistent if it fails before everything is done
      console.error("Error inserting dinosaur:", error);
      throw error;
    } finally {
      client.release(); // Disconnects from the pool to release resources
    }
  },
  updateDino: async (id, dino) => {
    const queryText = `
        UPDATE ${dinosaurTable}
        SET name = $1, description = $2, weight_kg = $3, height_m = $4, period_id = $5, diet_id = $6, class_id = $7, habitat_id = $8, img_url = $9
        WHERE id = $10
        RETURNING *;
    `;
    const queryParams = [
      dino.name,
      dino.description,
      dino.weight,
      dino.height,
      dino.period,
      dino.diet,
      dino.classType,
      dino.habitat,
      dino.img_url,
      id,
    ];
    const result = await pool.query(queryText, queryParams);
    return result.rows[0];
  },

  selectParentCategoryById: async (id) => {
    const queryText = `SELECT * FROM ${categoryTable} WHERE id = $1`;
    const queryParams = [id];
    const result = await pool.query(queryText, queryParams);
    return result.rows[0];
  },
  selectAllParentCategories: async () => {
    const queryText = `SELECT * FROM ${categoryTable} WHERE parent_id IS NULL`;
    const result = await pool.query(queryText);
    return result.rows;
  },
  selectAllSubCategories: async () => {
    const queryText = `
      SELECT *
      FROM ${categoryTable}
      WHERE parent_id IN (1, 2, 3, 4)
    `;
    const result = await pool.query(queryText);

    // Organize results into different categories
    const subCategories = {
      periods: result.rows.filter((row) => row.parent_id === 1),
      diets: result.rows.filter((row) => row.parent_id === 2),
      classes: result.rows.filter((row) => row.parent_id === 3),
      habitats: result.rows.filter((row) => row.parent_id === 4),
    };

    return subCategories;
  },
  selectSubCategoriesById: async (id) => {
    const queryText = `SELECT * FROM ${categoryTable} WHERE parent_id = $1`;
    const queryParams = [id];
    const result = await pool.query(queryText, queryParams);
    return result.rows;
  },
  selectSubCategoryIdByName: async (name) => {
    const queryText = `SELECT ${categoryTable}.id FROM ${categoryTable} WHERE name = $1`;
    const queryParams = [name];
    const result = await pool.query(queryText, queryParams);
    return result.rows[0].id;
  },
};
