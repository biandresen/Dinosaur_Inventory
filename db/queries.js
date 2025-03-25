import { pool } from "./pool.js";

export const db = {
  getAllMessages: async () => {
    let queryText = "SELECT * FROM messages";

    try {
      const result = await pool.query(queryText);
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error.stack);
      return "Error executing query";
    }
  },
  createMessage: async (text, username) => {
    let queryText =
      "INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING *";

    try {
      const result = await pool.query(queryText, [text, username]);
      return result.rows[0];
    } catch (error) {
      console.error("Error executing query", error.stack);
      return "Error executing query";
    }
  },
  getMessageById: async (id) => {
    let queryText = "SELECT * FROM messages WHERE id = $1";
    try {
      const result = await pool.query(queryText, [id]);
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.error("Error executing query", error.stack);
      return "Error executing query";
    }
  },
};
