import pkg from "pg";
import "dotenv/config";
const { Client } = pkg;

// SQL query to insert main categories and return their IDs
const insertMainCategories = `
INSERT INTO category (parent_id, name, description, img_url)
VALUES
(NULL, 'Period', 'Describes the different geological time periods when dinosaurs lived, from the Triassic to the Cretaceous.', 'period.jpg'),
(NULL, 'Diet', 'Explains the primary food sources of dinosaurs, whether herbivores, carnivores, omnivores, etc.', 'diet.png'),
(NULL, 'Class', 'Classifies dinosaurs based on their physical traits, including their body structure and classification in the family tree.', 'class.jpg'),
(NULL, 'Habitat', 'Describes the various environments where dinosaurs lived, such as forests, deserts, and plains.', 'habitat.png')
RETURNING id, name;
`;

const insertPeriodCategories = (parentId) => `
INSERT INTO category (parent_id, name, description, img_url)
VALUES
(${parentId}, 'Jurassic', 'The Middle period of the Mesozoic era, characterized by the rise of large herbivorous dinosaurs and the first birds.', ''),
(${parentId}, 'Cretaceous', 'The final period of the Mesozoic era, known for the dominance of flowering plants and the extinction of many dinosaur species.', ''),
(${parentId}, 'Late Jurassic', 'The later stage of the Jurassic period, when many iconic dinosaurs like Brachiosaurus roamed the Earth.', ''),
(${parentId}, 'Late Cretaceous', 'The final stage of the Cretaceous period, marked by the extinction of many species, including the famous T. rex.', '');
`;

const insertDietCategories = (parentId) => `
INSERT INTO category (parent_id, name, description, img_url)
VALUES
(${parentId}, 'Herbivore', 'Dinosaurs that primarily ate plants, such as ferns, trees, and shrubs.', ''),
(${parentId}, 'Carnivore', 'Dinosaurs that hunted and consumed meat, including other dinosaurs and small animals.', ''),
(${parentId}, 'Omnivore', 'Dinosaurs that ate both plants and animals, allowing them to adapt to a wider range of environments.', ''),
(${parentId}, 'Piscivore', 'Dinosaurs that primarily ate fish, often found in aquatic or coastal environments.', '');
`;

const insertClassCategories = (parentId) => `
INSERT INTO category (parent_id, name, description, img_url)
VALUES
(${parentId}, 'Theropod', 'Bipedal carnivores that were often the top predators, including species like Tyrannosaurus rex.', ''),
(${parentId}, 'Sauropod', 'Large, quadrupedal herbivores with long necks and tails, including species like Brachiosaurus and Apatosaurus.', ''),
(${parentId}, 'Pterosaur', 'Flying reptiles that lived alongside dinosaurs, with some having wingspans over 10 meters.', ''),
(${parentId}, 'Dromaeosaurid', 'Small, fast theropods known for their sharp claws and hunting in packs, including Velociraptor.', ''),
(${parentId}, 'Stegosaurid', 'Large herbivorous dinosaurs known for their plated backs and spiked tails, such as Stegosaurus.', ''),
(${parentId}, 'Ceratopsid', 'Herbivorous dinosaurs with large frills and horns, including species like Triceratops.', '');
`;

const insertHabitatCategories = (parentId) => `
INSERT INTO category (parent_id, name, description, img_url)
VALUES
(${parentId}, 'Forest', 'A densely wooded environment with abundant vegetation, providing shelter and food for many dinosaur species.', ''),
(${parentId}, 'Plains', 'Open grasslands with few trees, often home to herbivorous dinosaurs that grazed on the abundant plant life.', ''),
(${parentId}, 'Jungle', 'A lush, tropical environment with dense vegetation and high rainfall, home to a wide variety of dinosaur species.', ''),
(${parentId}, 'Desert', 'A dry, arid environment with little vegetation, where only the most adaptable dinosaur species could survive.', ''),
(${parentId}, 'Coastal/Marine', 'Environments near oceans and coastlines, home to dinosaurs that lived near water and occasionally hunted marine life.', ''),
(${parentId}, 'Semi-Arid', 'Dry regions that are not as extreme as deserts, often with sparse vegetation and seasonal rainfall.', '');
`;

export async function seedCategories() {
  console.log("Seeding categories...");

  const client = new Client({
    connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5432/dino_inventory`,
  });

  try {
    await client.connect();

    await client.query("DELETE FROM category");

    // Insert main categories and get their IDs
    const mainCategoriesResult = await client.query(insertMainCategories);
    console.log("Main categories inserted!");

    // Extract parent IDs from the insert result
    const periodId = mainCategoriesResult.rows.find(
      (row) => row.name === "Period"
    ).id;
    const dietId = mainCategoriesResult.rows.find(
      (row) => row.name === "Diet"
    ).id;
    const classId = mainCategoriesResult.rows.find(
      (row) => row.name === "Class"
    ).id;
    const habitatId = mainCategoriesResult.rows.find(
      (row) => row.name === "Habitat"
    ).id;

    // Insert subcategories for each parent
    await client.query(insertPeriodCategories(periodId));
    console.log("Period categories inserted!");

    await client.query(insertDietCategories(dietId));
    console.log("Diet categories inserted!");

    await client.query(insertClassCategories(classId));
    console.log("Class categories inserted!");

    await client.query(insertHabitatCategories(habitatId));
    console.log("Habitat categories inserted!");

    console.log("Table seeded successfully!");
  } catch (err) {
    console.error("Error seeding table:", err);
  } finally {
    await client.end();
  }
}

// seedCategories();
