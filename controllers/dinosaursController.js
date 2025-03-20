import {
  getDinosaursWithDetails,
  getAllCategories,
  addNewDino,
} from "../db/mockDatabase.js";

export const dinosaurController = {
  getDinosaurs: (req, res) => {
    let dinosaurs = getDinosaursWithDetails();
    let category = Object.keys(req.query)[0];
    const filterValue = req.query[category];

    if (category && filterValue) {
      const categories = getAllCategories();
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
    // console.log("DINOSAURS: ", dinosaurs);
    const dinosaur = dinosaurs.find((dino) => dino.id === id);
    // console.log("DINOSAUR: ", dinosaur);
    res.render("dino-details", { title: dinosaur.name, dinosaur });
  },
  getNewDinoForm: (req, res) => {
    const categories = getAllCategories();
    //TODO just use the getSubCategories-function instead
    const subCategories = categories.filter((cat) => cat.parent_id !== null);
    const periods = subCategories.filter((cat) => cat.parent_id === 1);
    // console.log("Periods: ", periods);

    const diets = subCategories.filter((cat) => cat.parent_id === 2);
    // console.log("Diets: ", diets);

    const classes = subCategories.filter((cat) => cat.parent_id === 3);
    // console.log("Classes: ", classes);

    const habitats = subCategories.filter((cat) => cat.parent_id === 4);
    // console.log("Habitats: ", habitats);

    res.render("new-dino", {
      title: "New Dino",
      periods,
      diets,
      classes,
      habitats,
    });
  },
  postNewDino: (req, res) => {
    console.log("New dino form submitted!");
    const formData = req.body;
    const uploadedFile = req.file;
    console.log(formData); // Form fields (text inputs, select options)
    console.log(uploadedFile); // Uploaded file details

    // Construct the image URL (relative to the public folder)
    const imgUrl = `uploads/${uploadedFile.filename}`;

    // Create a new dinosaur object
    const newDino = {
      name: formData.name,
      period: formData.period,
      diet: formData.diet,
      classType: formData.classType,
      habitat: formData.habitat,
      weight: formData.weight || "",
      height: formData.height || "",
      description: formData.description,
      img_url: imgUrl,
    };

    // Save newDino to your database or an array (depending on your setup)
    console.log("New Dino:", newDino);
    addNewDino(newDino);
    // Redirect back to the dinosaur list
    res.redirect("/dinosaurs");
  },
};
