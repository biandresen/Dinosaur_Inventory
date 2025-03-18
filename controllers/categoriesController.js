import { getMainCategories, getSubCategories } from "../db/mockDatabase.js";

export const categoriesController = {
  getAllCategories: (req, res) => {
    const categories = getMainCategories();
    res.render("categories", { title: "Categories", categories });
  },
  getCategoriesById: (req, res) => {
    const id = Number(req.params.id);
    const mainCategories = getMainCategories();
    const parentCategory = mainCategories.find((cat) => cat.id === id);

    const subCategories = getSubCategories(id);

    res.render("category-details", {
      title: parentCategory.name,
      parentCategory,
      subCategories,
    });
  },
};
