export const mockDatabase = {
  category: [
    {
      id: 1,
      name: "Period",
      description:
        "Explains the time period of when the respective dinosaur lived",
      img_url: "period.jpg",
      created_at: new Date(),
      parent_id: null,
    },
    {
      id: 2,
      name: "Diet",
      description: "Explains what the respective dinosaur primarily ate",
      img_url: "diet.png",
      created_at: new Date(),
      parent_id: null,
    },
    {
      id: 3,
      name: "Class",
      description: "Explains the physical classification type of the dinosaur",
      img_url: "class.jpg",
      created_at: new Date(),
      parent_id: null,
    },
    {
      id: 4,
      name: "Habitat",
      description:
        "Explains what kind of habitat or environment the respective dinosaur usually lived in and around",
      img_url: "habitat.png",
      created_at: new Date(),
      parent_id: null,
    },

    // Subcategories for "Period"
    {
      id: 5,
      parent_id: 1,
      name: "Jurassic",
      description: "Middle period of the Mesozoic era",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 6,
      parent_id: 1,
      name: "Cretaceous",
      description: "Final period of the Mesozoic era",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 19,
      parent_id: 1,
      name: "Late Jurassic",
      description: "Late stage of the Jurassic period",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 20,
      parent_id: 1,
      name: "Late Cretaceous",
      description: "Late stage of the Cretaceous period",
      img_url: "",
      created_at: new Date(),
    },

    // Subcategories for "Diet"
    {
      id: 7,
      parent_id: 2,
      name: "Herbivore",
      description: "Eats plants",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 8,
      parent_id: 2,
      name: "Carnivore",
      description: "Eats meat",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 9,
      parent_id: 2,
      name: "Omnivore",
      description: "Eats meat and plants",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 10,
      parent_id: 2,
      name: "Piscivorous",
      description: "Eats mainly fish",
      img_url: "",
      created_at: new Date(),
    },

    // Subcategories for "Class"
    {
      id: 11,
      parent_id: 3,
      name: "Theropod",
      description: "Bipedal carnivores",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 12,
      parent_id: 3,
      name: "Sauropod",
      description: "Large quadrupedal herbivores",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 13,
      parent_id: 3,
      name: "Pterosaur",
      description: "Flying reptiles",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 14,
      parent_id: 3,
      name: "Dromaeosaurid",
      description: "Small, fast, and intelligent theropods",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 15,
      parent_id: 3,
      name: "Stegosaurid",
      description: "Large herbivores with plated backs",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 16,
      parent_id: 3,
      name: "Ceratopsid",
      description: "Horned dinosaurs with large frills",
      img_url: "",
      created_at: new Date(),
    },

    // Subcategories for "Habitat"
    {
      id: 17,
      parent_id: 4,
      name: "Forest",
      description: "Densely wooded area",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 18,
      parent_id: 4,
      name: "Plains",
      description: "Open grasslands",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 19,
      parent_id: 4,
      name: "Jungle",
      description: "In the jungle",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 20,
      parent_id: 4,
      name: "Desert",
      description: "In the desert",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 21,
      parent_id: 4,
      name: "Coastal/Marine",
      description: "Near oceans and coastlines",
      img_url: "",
      created_at: new Date(),
    },
    {
      id: 22,
      parent_id: 4,
      name: "Semi-Arid",
      description: "Dry, desert-like regions",
      img_url: "",
      created_at: new Date(),
    },
  ],

  dinosaur: [
    {
      id: 1,
      name: "Brachiosaurus",
      description:
        "A gigantic, long-necked herbivore known for its towering height and front legs longer than its back legs.",
      weight_kg: 56000,
      height_m: 12,
      period_id: 19, // Late Jurassic
      diet_id: 7, // Herbivore
      class_id: 12, // Sauropod
      habitat_id: 17, // Forest
      img_url: "uploads/brachiosaurus.jpg",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Pteranodon",
      description:
        "A large flying reptile with a wingspan of up to 7 meters and a distinctive crest on its head.",
      weight_kg: 25,
      height_m: 2,
      period_id: 20,
      diet_id: 10,
      class_id: 13,
      habitat_id: 21,
      img_url: "uploads/pteranodon.jpg",
      created_at: new Date(),
    },
    {
      id: 3,
      name: "Velociraptor",
      description:
        "A small, fast, and intelligent theropod with a sickle-shaped claw on each foot, likely used for hunting.",
      weight_kg: 18,
      height_m: 0.5,
      period_id: 20,
      diet_id: 8,
      class_id: 11,
      habitat_id: 22,
      img_url: "uploads/velociraptor.jpeg",
      created_at: new Date(),
    },
    {
      id: 4,
      name: "Stegosaurus",
      description:
        "A large herbivore with distinctive back plates and a spiked tail (thagomizer) used for defense.",
      weight_kg: 5000,
      height_m: 4,
      period_id: 19,
      diet_id: 7,
      class_id: 15,
      habitat_id: 17,
      img_url: "uploads/stegosaurus.jpg",
      created_at: new Date(),
    },
    {
      id: 5,
      name: "Triceratops",
      description:
        "A large quadrupedal herbivore with three facial horns and a large bony frill.",
      weight_kg: 9000,
      height_m: 3,
      period_id: 20,
      diet_id: 7,
      class_id: 16,
      habitat_id: 17,
      img_url: "uploads/triceratops.jpg",
      created_at: new Date(),
    },
    {
      id: 6,
      name: "Tyrannosaurus rex",
      description:
        "A massive carnivorous theropod with powerful jaws and sharp teeth, considered one of the most fearsome predators.",
      weight_kg: 9000,
      height_m: 4,
      period_id: 20, // Late Cretaceous
      diet_id: 8, // Carnivore
      class_id: 11, // Theropod
      habitat_id: 18, // Plains
      img_url: "uploads/t-rex.jpeg",
      created_at: new Date(),
    },
  ],
};

// Helper function to get category name by ID
function getCategoryName(categoryId) {
  return (
    mockDatabase.category.find((c) => c.id === categoryId)?.name || "Unknown"
  );
}

// Function to get detailed dinosaur info with categories
export function getDinosaursWithDetails() {
  return mockDatabase.dinosaur.map((dino) => ({
    ...dino,
    period: getCategoryName(dino.period_id),
    diet: getCategoryName(dino.diet_id),
    class: getCategoryName(dino.class_id),
    habitat: getCategoryName(dino.habitat_id),
  }));
}

export function getParentCategories() {
  return mockDatabase.category.filter(
    (category) => category.parent_id === null
  );
}

export function getAllCategories() {
  return mockDatabase.category;
}

export function getSubCategories(id) {
  return mockDatabase.category.filter((subCat) => subCat.parent_id === id);
}

export function getAllIndividualSubCategories() {
  const categories = getAllCategories();
  const subCategories = categories.filter((cat) => cat.parent_id !== null);

  const periods = subCategories.filter((cat) => cat.parent_id === 1);
  const diets = subCategories.filter((cat) => cat.parent_id === 2);
  const classes = subCategories.filter((cat) => cat.parent_id === 3);
  const habitats = subCategories.filter((cat) => cat.parent_id === 4);
  return {
    periods,
    diets,
    classes,
    habitats,
  };
}

export function addNewDino(newDino) {
  function findCategoryId(categoryName) {
    const category = mockDatabase.category.find(
      (cat) => cat.name === categoryName
    );
    return category ? category.id : null;
  }

  const treatedDino = {
    id: mockDatabase.dinosaur.length + 1,
    name: newDino.name,
    description: newDino.description,
    weight_kg: newDino.weight,
    height_m: newDino.height,
    period_id: findCategoryId(newDino.period),
    diet_id: findCategoryId(newDino.diet),
    class_id: findCategoryId(newDino.classType),
    habitat_id: findCategoryId(newDino.habitat),
    img_url: newDino.img_url,
    created_at: new Date(),
  };

  console.log("TREATED DINO: ", treatedDino);
  mockDatabase.dinosaur.push(treatedDino);
}

export function addNewCategory(newCategory) {
  function getParentCategoryId(categoryName) {
    const parentCategory = mockDatabase.category.find(
      (pCat) => pCat.name === categoryName
    );
    return parentCategory.id;
  }

  const treatedCategory = {
    id: mockDatabase.category.length + 1,
    parent_id: getParentCategoryId(newCategory.parentCategory),
    name: newCategory.name,
    description: newCategory.description,
    img_url: "",
    created_at: new Date(),
  };
  console.log("TREATED CATEGORY: ", treatedCategory);
  mockDatabase.category.push(treatedCategory);
}
