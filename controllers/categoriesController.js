import { db } from "../db/queries.js";

export const categoriesController = {
  getAllParentCategories: async (req, res) => {
    const categories = await db.selectAllParentCategories();
    res.render("categories", { title: "Categories", categories });
  },
  getCategories: async (req, res) => {
    const id = req.params.id;
    const allowedIds = ["1", "2", "3", "4"]; // Allowed category IDs as strings

    if (!allowedIds.includes(id)) {
      return res.status(404).render("404"); // Render 404 page if ID is invalid
    }

    const parentCategory = await db.selectParentCategoryById(id);
    const subCategories = await db.selectSubCategoriesById(id);
    res.render("category-details", {
      title: `${parentCategory.name}`,
      parentCategory,
      subCategories,
    });
  },
  getNewCategoriesForm: async (req, res) => {
    const parentCategories = await db.selectAllParentCategories();
    res.render("new-category", {
      title: "New Category",
      parentCategories,
    });
  },
  postNewSubCategory: async (req, res) => {
    console.log("New sub category submitted!");
    const formData = req.body;
    console.log("FORM DATA: ", formData);
    const newCategoryResult = await db.insertSubCategory(formData);
    res.redirect("/categories");
  },
};
