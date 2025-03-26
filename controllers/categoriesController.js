import { db } from "../db/queries.js";

export const categoriesController = {
  getAllParentCategories: async (req, res) => {
    const categories = await db.selectAllParentCategories();
    res.render("categories", { title: "Categories", categories });
  },
  getCategories: async (req, res) => {
    const id = req.params.id;
    const parentCategory = await db.selectParentCategoryById(id);
    const subCategories = await db.selectSubCategoriesById(id);
    res.render("category-details", {
      title: `${parentCategory.name}`,
      parentCategory,
      subCategories,
    });
  },
  // getNewCategoriesForm: (req, res) => {
  //   const parentCategories = getParentCategories();
  //   res.render("new-category", {
  //     title: "New Category",
  //     parentCategories,
  //   });
  // },
  // postNewCategory: (req, res) => {
  //   const formData = req.body;
  //   addNewCategory(formData);
  //   res.redirect("/categories");
  // },
};
