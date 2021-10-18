import express from "express";
import cors from "cors";
import configDB from "./config/db";
import configCloudinary from "./config/cloudinary";
import "dotenv/config";

import files from "./routes/files";
configDB();
configCloudinary();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/files", files);

app.get("/", async (req, res) => {
    return res.send(`<h1 style="text-align:center">welcome</h1>`);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
