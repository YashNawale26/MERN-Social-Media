import User from "../models/user.js" // to interact with the database

/* READ */ 

export const getUser = async (req,res) => {
    try{
        const {id} = req.params;  //fetch the id from the request parameters
        const user = await User.findById(id); // find the user by the id
        res.status(200).json(user); // respond with the user
    }catch(err){
        res.status(404).json({message: err.message})
    }
}