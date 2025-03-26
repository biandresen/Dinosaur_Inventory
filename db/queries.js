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

  // getSubCategories: async () => {
  //   let queryText = `SELECT * FROM ${categoryTable} WHERE parent_id IS NOT NULL`;
  //   pool.query(queryText);
  // },
};
