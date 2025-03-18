import {
  getDinosaursWithDetails,
  getAllSubCategories,
} from "../db/mockDatabase.js";

export const dinosaurController = {
  getDinosaurs: (req, res) => {
    let dinosaurs = getDinosaursWithDetails();
    let category = Object.keys(req.query)[0];
    const filterValue = req.query[category];

    if (category && filterValue) {
      const categories = getAllSubCategories();
      category = category.toLowerCase();

      const categoryFilterId = categories.find(
        (cat) => cat.name === filterValue
      )?.id;

      dinosaurs = dinosaurs.filter((dino) => {
        return dino[category + "_id"] === categoryFilterId;
      });
    }

    // Render the dinosaurs (filtered or unfiltered)
    res.render("dinosaurs", { title: "Dinosaurs", dinosaurs });
  },
  getDinosaurById: (req, res) => {
    const id = Number(req.params.id);
    const dinosaurs = getDinosaursWithDetails();
    console.log("DINOSAURS: ", dinosaurs);
    const dinosaur = dinosaurs.find((dino) => dino.id === id);
    console.log("DINOSAUR: ", dinosaur);
    res.render("dino-details", { title: dinosaur.name, dinosaur });
  },
};
