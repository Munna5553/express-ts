import { register } from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post("/register", register);

export default router;