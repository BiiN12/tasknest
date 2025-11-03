import { register, login } from "../controllers/authController.js";
import { Router } from "express";
import cors from "cors";

const router = Router();

router.use(cors());

router.post("/register", register);
router.post("/login", login);

export default router;
