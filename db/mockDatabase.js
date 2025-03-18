const mockDatabase = {
  category: [
    {
      id: 1,
      name: "Time Period",
      description:
        "Explains the time period of when the respective dinosaur lived",
      img_url: "period.png",
      created_at: new Date(),
      parent_id: null, // No parent, this is a main category
    },
    {
      id: 2,
      name: "Diet",
      description: "Explains what the respective dinosaur primarily ate",
      img_url: "diet.png",
      created_at: new Date(),
      parent_id: null, // No parent, this is a main category
    },
    {
      id: 3,
      name: "Class",
      description: "Explains the physical classification type of the dinosaur",
      img_url: "class.png",
      created_at: new Date(),
      parent_id: null, // No parent, this is a main category
    },
    {
      id: 4,
      name: "Habitat",
      description:
        "Explains what kind of habitat or environment the respective dinosaur usually lived in and around",
      img_url: "habitat.png",
      created_at: new Date(),
      parent_id: null, // No parent, this is a main category
    },

    // Subcategories for "Period"
    {
      id: 5,
      parent_id: 1,
      name: "Jurassic",
      description: "Middle period of the Mesozoic era",
      img_url: "jurassic.jpg",
      created_at: new Date(),
    },
    {
      id: 6,
      parent_id: 1,
      name: "Cretaceous",
      description: "Final period of the Mesozoic era",
      img_url: "cretaceous.jpg",
      created_at: new Date(),
    },

    // Subcategories for "Diet"
    {
      id: 7,
      parent_id: 2,
      name: "Herbivore",
      description: "Eats plants",
      img_url: "herbivore.jpg",
      created_at: new Date(),
    },
    {
      id: 8,
      parent_id: 2,
      name: "Carnivore",
      description: "Eats meat",
      img_url: "carnivore.jpg",
      created_at: new Date(),
    },
    {
      id: 9,
      parent_id: 2,
      name: "Omnivore",
      description: "Eats meat and plants",
      img_url: "omnivore.jpg",
      created_at: new Date(),
    },

    // Subcategories for "Class"
    {
      id: 10,
      parent_id: 3,
      name: "Theropod",
      description: "Bipedal carnivores",
      img_url: "theropod.jpg",
      created_at: new Date(),
    },
    {
      id: 11,
      parent_id: 3,
      name: "Sauropod",
      description: "Large quadrupedal herbivores",
      img_url: "sauropod.jpg",
      created_at: new Date(),
    },

    // Subcategories for "Habitat"
    {
      id: 12,
      parent_id: 4,
      name: "Forest",
      description: "Densely wooded area",
      img_url: "forest.jpg",
      created_at: new Date(),
    },
    {
      id: 13,
      parent_id: 4,
      name: "Plains",
      description: "Open grasslands",
      img_url: "plains.jpg",
      created_at: new Date(),
    },
    {
      id: 14,
      parent_id: 4,
      name: "Jungle",
      description: "In the jungle",
      img_url: "jungle.jpg",
      created_at: new Date(),
    },
  ],

  dinosaur: [
    {
      id: 1,
      name: "Tyrannosaurus Rex",
      description: "Large carnivorous dinosaur",
      weight_kg: 8000.0,
      height_m: 3.6,
      period_id: 5, // "Jurassic"
      diet_id: 8, // "Carnivore"
      class_id: 10, // "Theropod"
      habitat_id: 12, // "Forest"
      img_url: "t-rex.jpg",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Brachiosaurus",
      description: "Tall herbivore dinosaur",
      weight_kg: 56000.0,
      height_m: 12.0,
      period_id: 6, // "Cretaceous"
      diet_id: 7, // "Herbivore"
      class_id: 11, // "Sauropod"
      habitat_id: 13, // "Plains"
      img_url: "brachiosaurus.jpg",
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

export function getMainCategories() {
  return mockDatabase.category.filter(
    (category) => category.parent_id === null
  );
}

export function getSubCategories(id) {
  return mockDatabase.category.filter((subCat) => subCat.parent_id === id);
}
