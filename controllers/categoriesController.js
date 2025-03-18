import { getMainCategories } from "../db/mockDatabase.js";

export const categoriesController = {
  getAllCategories: (req, res) => {
    const categories = getMainCategories();
    res.render("categories", { title: "Categories", categories });
  },
};
