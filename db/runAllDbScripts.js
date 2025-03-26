import { populateDb } from "./populateDb.js";
import { seedCategories } from "./populateCategoryTable.js";
import { seedDinos } from "./populateDinoTable.js";

async function main() {
  await populateDb();
  await seedCategories();
  await seedDinos();
}

main().catch((err) => console.error("Error during seeding:", err));
