export const indexController = {
  getHomepage: (req, res) => {
    res.render("index", { title: "Dinosaur Inventory" });
  },
};
