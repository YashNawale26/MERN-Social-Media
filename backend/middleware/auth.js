import jwt from "jsonwebtoken"; // to create a token

export const verifyToken = async (req, res, next) => {  //this middleware is used to verify the token
try{              //next is a function that is called to pass control to the next middleware function in case of an error
        let token = req.header("Authorization"); // fetch the token from the header
        if(!token) return res.status(403).json("You are not authorized"); // if there is no token, respond with an error

        if(token.startsWith("Bearer")){ // if the token starts with Bearer then remove the Bearer from the token and get the token. Bearer is a type of token that is used to authenticate the user and it is used in the HTTP header. example of a Bearer token is "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYx"
            token = token.slice(7, token.length).trimLeft(); // remove the Bearer from the token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // verify the token with the secret key from the .env file and store the result in the verified variable 
        req.user = verified; 
        next(); // continue with the next middleware function.
    } catch {
        return res.status(500).json({error : err.message});
    }
}