const mockDatabase = {
  period: [
    {
      id: 1,
      name: "Jurassic",
      description: "Middle period of the Mesozoic era",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Cretaceous",
      description: "Final period of the Mesozoic era",
      created_at: new Date(),
    },
  ],
  diet: [
    {
      id: 1,
      name: "Herbivore",
      description: "Eats plants",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Carnivore",
      description: "Eats meat",
      created_at: new Date(),
    },
    {
      id: 3,
      name: "Omnivore",
      description: "Eats meat and plants",
      created_at: new Date(),
    },
  ],
  class: [
    {
      id: 1,
      name: "Theropod",
      description: "Bipedal carnivores",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Sauropod",
      description: "Large quadrupedal herbivores",
      created_at: new Date(),
    },
  ],
  habitat: [
    {
      id: 1,
      name: "Forest",
      description: "Densely wooded area",
      created_at: new Date(),
    },
    {
      id: 2,
      name: "Plains",
      description: "Open grasslands",
      created_at: new Date(),
    },
    {
      id: 3,
      name: "Aerial",
      description: "In the sky",
      created_at: new Date(),
    },
  ],
  dinosaur: [
    {
      id: 1,
      period_id: 1,
      name: "Tyrannosaurus Rex",
      diet_id: 2,
      weight_kg: 8000.0,
      height_m: 3.6,
      description: "Large carnivorous dinosaur",
      img_url: "t-rex.jpg",
      created_at: new Date(),
      class_id: 1,
      habitat_id: 2,
    },
    {
      id: 2,
      period_id: 2,
      name: "Brachiosaurus",
      diet_id: 1,
      weight_kg: 56000.0,
      height_m: 12.0,
      description: "Tall herbivore dinosaur",
      img_url: "brachiosaurus.jpg",
      created_at: new Date(),
      class_id: 2,
      habitat_id: 1,
    },
  ],
};

// Function to query mock database
export function getDinosaursWithDetails() {
  return mockDatabase.dinosaur.map((dino) => {
    return {
      ...dino,
      period:
        mockDatabase.period.find((p) => p.id === dino.period_id)?.name ||
        "Unknown",
      diet:
        mockDatabase.diet.find((d) => d.id === dino.diet_id)?.name || "Unknown",
      class:
        mockDatabase.class.find((c) => c.id === dino.class_id)?.name ||
        "Unknown",
      habitat:
        mockDatabase.habitat.find((h) => h.id === dino.habitat_id)?.name ||
        "Unknown",
    };
  });
}

// console.log(getDinosaursWithDetails());
