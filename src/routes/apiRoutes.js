import express from "express";
import { getFacts, createFacts, updateFacts, deleteFacts, uploadImage, updateImage, deleteImage } from "../controllers/apiController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/facts", getFacts);
router.post("/facts", createFacts);
router.put("/facts/:id", updateFacts);
router.delete("/facts/:id", deleteFacts);

router.post("/facts/:id/image", upload.single("image"), uploadImage);
router.put("/facts/:id/image", upload.single("image"), updateImage);
router.delete("/facts/:id/image", deleteImage);

export default router;
