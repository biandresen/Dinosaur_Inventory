import { getDinosaursWithDetails } from "../db/mockDatabase.js";

export const dinosaurController = {
  getAllDinosaurs: (req, res) => {
    const dinosaurs = getDinosaursWithDetails();
    res.render("dinosaurs", { title: "Dinosaurs", dinosaurs });
  },
};
