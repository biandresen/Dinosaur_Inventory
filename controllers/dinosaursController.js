import { getDinosaursWithDetails } from "../db/mockDatabase.js";

export const dinosaurController = {
  getAllDinosaurs: (req, res) => {
    const dinosaurs = getDinosaursWithDetails();
    res.render("dinosaurs", { title: "Dinosaurs", dinosaurs });
  },
  getDinosaur: (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const dinosaurs = getDinosaursWithDetails();
    console.log("DINOSAURS: ", dinosaurs);
    const dinosaur = dinosaurs.find((dino) => dino.id === id);
    console.log("DINOSAUR: ", dinosaur);
    res.render("dino-details", { title: "Dinosaurs", dinosaur });
  },
};
