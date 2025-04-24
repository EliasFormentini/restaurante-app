import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();

// Security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

app.listen(3000, () => console.log("Server rodando na porta 3000."));
