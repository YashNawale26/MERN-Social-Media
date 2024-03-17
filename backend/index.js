import express from "express";  
import bodyParser from "body-parser"; // it is used to parse the incoming request bodies in a middleware before you handle it
import mongoose from "mongoose"; // it is used to connect to the MongoDB database
import cors from "cors"; // it is used to enable the cross-origin resource sharing
import dotenv from "dotenv"; // it is used to load environment variables from a .env file into process.env
import multer from "multer"; // it is used to handle file uploads
import helmet from "helmet"; // it is used to secure the Express app by setting various HTTP headers
import morgan from "morgan"; // it is used to log the HTTP requests
import path from "path"; // it is used to work with file and directory paths
import { fileURLToPath } from "url"; // it is used to convert a file URL to a file path

import authRoutes from "./routes/auth.js"; // it is used to import the auth routes
import userRoutes from "./routes/users.js"; // it is used to import the user routes
import postRoutes from "./routes/posts.js"; // it is used to import the post routes
import { createPost } from "./controllers/post.js"; // it is used to import the createPost function from the posts controller
import { register } from "./controllers/auth.js"; // it is used to import the register function from the auth controller
import { verifyToken } from "./middleware/auth.js"; // it is used to import the verifyPost middleware
// import User from "./models/Users.js"; // it is used to import the User model
// import Post from "./models/Post.js"; // it is used to import the Post model
// import { users, posts } from "./data/index.js"; 

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);  // it is used to get the filename of the current module
const __dirname = path.dirname(__filename); // it is used to get the directory name of the current module
dotenv.config(); // it is used to load environment variables from a .env file into process.env

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))  // cross-origin resource sharing policy. Cross-origin requests are only allowed if the server responds with the right headers/. Cross-origin means that the server is on a different domain than the client.
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", extended: true })); // it is used to parse the incoming request bodies in a middleware before you handle it
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // it is used to serve static files

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage})

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);  //middleware while uploading a single picture, register is the uploading function,
app.post("/posts", verifyToken, upload.single("picture"), createPost); //middleware while uploading a single picture, createPost is the uploading function

/* ROUTES */
app.use("/auth", authRoutes); // it is used to use the auth routes
app.use("/users", userRoutes); // it is used to use the user routes which include the following routes: get, update, delete, follow, unfollow, get friends, get all users
app.use("/posts", postRoutes); // it is used to use the post routes. in the post routes, we have the following routes: create, update, delete, like, get, get timeline posts

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log(`${error} did not connect`));
