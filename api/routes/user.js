import express from "express";

import { addUser, getAllUsers, getUserInfo } from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:email").get(getUserInfo);

export default router;
