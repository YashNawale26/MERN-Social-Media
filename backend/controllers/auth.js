import bcrypt from "bcrypt" // to encrypt the password
import jwt from "jsonwebtoken" // to create a token
import User from "../models/Users.js" // to interact with the database

/* REGISTER USER */
export const register = async (req,res) => {  //async because we are calling the database and it takes time
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt(); // generate a salt to hash the password. 
        const passwordHash = await bcrypt.hash(password, salt); // hash the password with the salt

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000), // generate a random number between 0 and 1000 to simulate the number of times the user has viewed a profile
            impressions: Math.floor(Math.random() * 10000), // generate a random number between 0 and 10000 to simulate the number of times the user has been viewed
        });

        const savedUser = await newUser.save(); // save the user to the database
        res.status(201).json(savedUser); // 201 is the code for successfully created an object
    } catch (err) {
        res.status(500).json({error: err.message}); // respond with the error
    }
};

/* LOGGING IN */
export const login = async (req,res) => {
    try {
        const {email,password} = req.body; // email and password is fetch from req.body which is the input from the frontend
        
        //find user
        const user = await User.findOne({ email: email}); // find the user by the email
        if (!user) {
            return res.status(404).json({msg: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password); // compare the password with the hashed password
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET, {expiresIn: 3600}); // create a token with the user's id and the secret key from the .env file and set the expiration time to 3600 seconds (1 hour). JWT Secret is a string that is used to sign the token. It is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
        delete user.pasword; // delete the password from the user object so that it is not sent to the frontend
        res.status(200).json({user, token}); // respond with the user and the token
    }
    catch (err) {
        res.status(500).json({error: err.message}); // respond with the error
    }
};