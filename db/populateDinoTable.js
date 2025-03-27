import pkg from "pg";
import "dotenv/config";
const { Client } = pkg;

// SQL query to insert main categories and return their IDs
const insertDinos = `
INSERT INTO dinosaur (name, description, weight_kg, height_m, period_id, diet_id, class_id, habitat_id, img_url) VALUES
('Brachiosaurus', 'A gigantic, long-necked herbivore known for its towering height and front legs longer than its back legs.', 56000, 12, 7, 9, 14, 19, 'uploads/brachiosaurus.jpg'),

('Pteranodon', 'A large flying reptile with a wingspan of up to 7 meters and a distinctive crest on its head.', 25, 2, 6, 12, 15, 23, 'uploads/pteranodon.jpg'),

('Velociraptor', 'A small, fast, and intelligent theropod with a sickle-shaped claw on each foot, likely used for hunting.', 18, 0.5, 8, 10, 16, 22, 'uploads/velociraptor.jpeg'),

('Stegosaurus', 'A large herbivore with distinctive back plates and a spiked tail (thagomizer) used for defense.', 5000, 4, 5, 9, 17, 20, 'uploads/stegosaurus.jpg'),

('Triceratops', 'A large quadrupedal herbivore with three facial horns and a large bony frill.', 9000, 3, 8, 9, 18, 19, 'uploads/triceratops.jpg'),

('Tyrannosaurus rex', 'A massive carnivorous theropod with powerful jaws and sharp teeth, considered one of the most fearsome predators.', 9000, 4, 8, 10, 13, 21, 'uploads/t-rex.jpeg');
`;

export async function seedDinos() {
  console.log("Seeding dinos...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Ensure SSL for cloud connections (e.g., Railway)
    },
  });

  try {
    await client.connect();

    await client.query("DELETE FROM dinosaur");

    await client.query(insertDinos);

    console.log("Dinos inserted!");

    console.log("Table seeded successfully!");
  } catch (err) {
    console.error("Error seeding table:", err);
  } finally {
    await client.end();
  }
}

// seedDinos();
