import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try{
        const conn = await (`mongoose.connect(process.env.MONGO_URI)`);
        } catch (error) {
            console.error("MongoBD connection error:", error);
        }
};

app.get("/", (req, res) => {
    res.json({sucess: true, message: "API is working"});

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();

});
