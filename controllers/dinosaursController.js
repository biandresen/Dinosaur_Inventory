import {
  getDinosaursWithDetails,
  getAllCategories,
  addNewDino,
  getAllIndividualSubCategories,
  mockDatabase,
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
    const { periods, diets, classes, habitats } =
      getAllIndividualSubCategories();

    const id = Number(req.params.id);
    const dinosaurs = getDinosaursWithDetails();
    const dinosaur = dinosaurs.find((dino) => dino.id === id);
    res.render("dino-details", {
      title: dinosaur.name,
      dinosaur,
      periods,
      diets,
      classes,
      habitats,
    });
  },
  getNewDinoForm: (req, res) => {
    const { periods, diets, classes, habitats } =
      getAllIndividualSubCategories();

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
    console.log(formData);
    console.log(uploadedFile);

    const imgUrl = `uploads/${uploadedFile.filename}`;

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

    console.log("New Dino:", newDino);
    addNewDino(newDino);
    res.redirect("/dinosaurs");
  },
  editDino: (req, res) => {
    const dinoId = Number(req.params.id);
    const newDinoData = req.body;
    console.log("Updating dino:", dinoId, newDinoData);

    // Find the index of the dinosaur
    const dinoIndex = mockDatabase.dinosaur.findIndex(
      (dino) => dino.id === dinoId
    );
    if (dinoIndex === -1) {
      return res.status(404).send("Dinosaur not found");
    }

    // Convert category names to IDs
    function getCategoryId(categoryName) {
      const category = mockDatabase.category.find(
        (cat) => cat.name === categoryName
      );
      return category ? category.id : null;
    }

    // If no new image is uploaded, keep the old one
    const existingDino = mockDatabase.dinosaur[dinoIndex];
    const img_url =
      req.file ? `uploads/${req.file.filename}` : existingDino.img_url;

    // Update the dinosaur
    mockDatabase.dinosaur[dinoIndex] = {
      ...existingDino, // Preserve existing properties
      name: newDinoData.name,
      description: newDinoData.description,
      weight_kg: newDinoData.weight,
      height_m: newDinoData.height,
      period_id: getCategoryId(newDinoData.period),
      diet_id: getCategoryId(newDinoData.diet),
      class_id: getCategoryId(newDinoData.classType),
      habitat_id: getCategoryId(newDinoData.habitat),
      img_url: img_url,
    };

    console.log("Updated dinosaur:", mockDatabase.dinosaur[dinoIndex]);

    res.redirect(`/dinosaurs/${dinoId}`); // Redirect back to the details page
  },
  deleteDino: (req, res) => {
    const dinoId = Number(req.params.id);
    console.log(dinoId);
    // Find the index of the dinosaur
    const dinoIndex = mockDatabase.dinosaur.findIndex(
      (dino) => dino.id === dinoId
    );

    if (dinoIndex === -1) {
      return res.status(404).send("Dinosaur not found");
    }

    // Remove the dinosaur from the array
    mockDatabase.dinosaur.splice(dinoIndex, 1);

    console.log(`Dinosaur with ID ${dinoId} deleted.`);

    res.redirect("/dinosaurs"); // Redirect back to the list
  },
};
