import express from "express";
import home from "./src/routes/index.js";
import apiRoutes from "./src/routes/apiRoutes.js";

const app = express();

app.use(express.json());

app.use("/", home);
app.use("/api", apiRoutes);

export default app;
