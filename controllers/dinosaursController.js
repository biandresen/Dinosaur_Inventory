import { db } from "../db/queries.js";

export const dinosaurController = {
  getDinos: async (req, res) => {
    let dinosaurs = [];
    const { key, value } = req.query;
    console.log("key: ", key, " value: ", value);

    if (key && value) {
      const filterKey = key.toLowerCase();
      const filterValue = value.toLowerCase();
      const filter = { key: filterKey, value: filterValue };

      console.log("FILTER: Not empty", filter);

      try {
        dinosaurs = await db.selectDinos(filter);
        console.log(dinosaurs);
      } catch (error) {
        console.log("ERROR: ", error);
        // Send a meaningful response to the user here
        res.status(500).send("Error fetching dinosaurs");
        return;
      }
    } else {
      console.log("FILTER: Empty");
      try {
        dinosaurs = await db.selectDinos();
        console.log(dinosaurs);
      } catch (error) {
        console.log("ERROR: ", error);
        // Send a meaningful response to the user here
        res.status(500).send("Error fetching dinosaurs");
        return;
      }
    }

    res.render("dinosaurs", { title: "Dinosaurs", dinosaurs });
  },
  getDinoById: async (req, res) => {
    const dinoId = req.params.id;
    if (!dinoId) return;

    const dinosaur = await db.selectDinoById(dinoId);

    const subCategories = await db.selectAllSubCategories();
    const { periods, diets, classes, habitats } = subCategories;

    res.render("dino-details", {
      title: `${dinosaur.name}`,
      dinosaur,
      periods,
      diets,
      classes,
      habitats,
    });
  },
  getNewDinoForm: async (req, res) => {
    const { periods, diets, classes, habitats } =
      await db.selectAllSubCategories();

    res.render("new-dino", {
      title: "New Dino",
      periods,
      diets,
      classes,
      habitats,
    });
  },

  postNewDino: async (req, res) => {
    console.log("New dino form submitted!");
    const formData = req.body;
    const uploadedFile = req.file;

    console.log("Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);

    const imgUrl = `uploads/${uploadedFile.filename}`;

    const newDino = {
      name: formData.name,
      period_id: parseInt(formData.period), //The option from the form data sends the id instead of the name
      diet_id: parseInt(formData.diet),
      class_id: parseInt(formData.classType),
      habitat_id: parseInt(formData.habitat),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      description: formData.description,
      img_url: imgUrl,
    };

    console.log("New Dino Object:", newDino);

    try {
      const insertedDino = await db.insertDino(newDino);
      console.log("Inserted Dino:", insertedDino);
      res.redirect("/dinosaurs");
    } catch (error) {
      console.error("Error inserting dinosaur:", error);
      res.status(500).send("Error adding dinosaur");
    }
  },

  editDino: async (req, res) => {
    console.log("Dino edit submitted!");
    const dinoId = req.params.id;
    const formData = req.body;
    const uploadedFile = req.file;
    console.log("Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);
    console.log("Current image url: ", formData.img_url);

    const imgUrl =
      uploadedFile ? `uploads/${uploadedFile.filename}` : formData.img_url;

    const editedDino = { ...formData, img_url: imgUrl };
    console.log("EDITED DINO: ", editedDino);

    const dinoResult = await db.updateDino(dinoId, editedDino);
    console.log("DINO RESULT: ", dinoResult);

    res.redirect(`/dinosaurs/${dinoId}`);
  },
  deleteDino: async (req, res) => {
    const dinoId = req.params.id;
    const deletedDino = await db.deleteDino(dinoId);
    console.log("DELETED DINO: ", deletedDino);
    res.redirect("/dinosaurs"); // Redirect back to the list
  },
};
