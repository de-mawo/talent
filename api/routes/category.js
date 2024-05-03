import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(addCategory);
router.route("/:id").patch(editCategory).delete(deleteCategory);

export default router;
