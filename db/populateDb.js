import pkg from "pg";
import "dotenv/config";
const { Client } = pkg;

const SQL_1 = `
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  img_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const SQL_2 = `
CREATE TABLE dinosaur (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  weight_kg DECIMAL(8,2),
  height_m DECIMAL(6,2),
  period_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  diet_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  class_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  habitat_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  img_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export async function populateDb() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Ensure SSL for cloud connections (e.g., Railway)
    },
  });

  try {
    await client.connect();

    // Drop tables if they exist
    await client.query("DROP TABLE IF EXISTS category CASCADE");
    await client.query("DROP TABLE IF EXISTS dinosaur CASCADE");

    // Create tables
    await client.query(SQL_1);
    await client.query(SQL_2);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

// populateDb();
