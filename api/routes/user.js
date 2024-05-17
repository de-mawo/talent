import express from "express";

import { addUser, getAllUsers, getUserInfo } from "../controllers/userController.js";
import {isAdmin} from '../utils/isAuth.js'

const router = express.Router();

router.route("/").get(isAdmin, getAllUsers).post(addUser);
router.route("/:email").get(getUserInfo);

export default router;
