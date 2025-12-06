import express from "express";
import { getFacts, createFacts, updateFacts, deleteFacts } from "../controllers/apiController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/facts", getFacts);
router.post("/facts", createFacts);
router.put("/facts/:id", updateFacts);
router.delete("/facts/:id", deleteFacts);
router.post("/upload", upload.single("image"), uploadImage);

export default router;
