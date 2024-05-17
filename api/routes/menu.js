import express from "express";
import {
  addMenu,
  getFavMenus,
  getMenus,
} from "../controllers/menuController.js";

const router = express.Router();

router.route("/").get(getMenus).post(addMenu).get(getFavMenus);
// router.route("/:id").patch(editCategory).delete(deleteCategory);

export default router;
