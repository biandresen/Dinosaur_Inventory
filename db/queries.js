import { pool } from "./pool.js";
const dinosaurTable = "dinosaur";
const categoryTable = "category";

export const db = {
  selectDinos: async (filter) => {
    let queryText = `SELECT * FROM ${dinosaurTable}`;
    const queryParams = [];

    if (filter && Object.keys(filter).length !== 0) {
      console.log("DB Filter not empty");

      queryText = `SELECT ${dinosaurTable} . * FROM ${dinosaurTable} JOIN ${categoryTable} ON ${dinosaurTable}.${filter.key}_id = ${categoryTable}.id WHERE ${categoryTable}.name ILIKE $1`;
      queryParams.push(`%${filter.value}%`); // Add % to handle partial matching with ILIKE
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
};
