import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSignup } from "./controllers/user.js";
import { postBlog } from "./controllers/blog.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let requestCount = 0;

const connectDB = async () => {
    try{
        const conn = await (`mongoose.connect(process.env.MONGO_URI)`);
        if(conn) {
            console.log("MongoDB connected");
        } 
    } catch (error) {
            console.error("MongoBD connection error:", error);
        }
};

app.get("/api/request-count", (req, res) => {
    res.json({requestCount});
});

app.use((req, res, next) => {
    requestCount++;
    console.log(`Request Count: ${requestCount}`);
    next();
});
    

app.get("/", (req, res) => {
    res.json({sucess: true, message: "Server is working"});

});

app.post("/signup", postSignup);

app.post("/login", postLogin);

app.post("/blogs", postBlog);

const checkHeaderKey = (req, res, next) => {
    const {api_token} = req.headers;
    console.log("API Token:", api_token);

    if(api_token == "admin") {
        console.log("API Key valid");
        next();

    } else {
        console.log("API Key invalid");
        res.status(401).json({message: "Unauthorized"});
    }
};

app.use(checkHeaderKey);

app.get("/api/test1", (req, res) => {

    console.log("Actual Controller Test1 called");
    res.json({message: "Test1 route reached"});
});

app.get("/api/test2", (req, res) => {

    console.log("Actual Controller Test2 called");
    res.json({message: "Test2 route reached"});
});





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();

});
