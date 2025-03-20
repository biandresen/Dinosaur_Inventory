import {
  addNewCategory,
  getParentCategories,
  getSubCategories,
} from "../db/mockDatabase.js";

export const categoriesController = {
  getAllCategories: (req, res) => {
    const categories = getParentCategories();
    res.render("categories", { title: "Categories", categories });
  },
  getCategoriesById: (req, res) => {
    const id = Number(req.params.id);
    const parentCategories = getParentCategories();
    const parentCategory = parentCategories.find((cat) => cat.id === id);

    const subCategories = getSubCategories(id);

    res.render("category-details", {
      title: parentCategory.name,
      parentCategory,
      subCategories,
    });
  },
  getNewCategoriesForm: (req, res) => {
    const parentCategories = getParentCategories();
    res.render("new-category", {
      title: "New Category",
      parentCategories,
    });
  },
  postNewCategory: (req, res) => {
    const formData = req.body;
    addNewCategory(formData);
    res.redirect("/categories");
  },
};
