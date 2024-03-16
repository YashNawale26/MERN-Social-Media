import User from "../models/Users.js" // to interact with the database

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

export const getUserFriends = async (req,res) => {  // get the friends of a user
    try {
        const { id } = req.params;
    const user = await User.findbyId(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(  //
        ({ _id, firstName, lastName, occupation, location, picturePath})=>{
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
export const addRemoveFriend = async (req,res) => {  // add or remove a friend
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){  // if the user is already a friend, remove the friend
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);  // if the user is not a friend, add the friend
            friend.friends.push(id);
        } 

        await user.save();
        await friends.map();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(  //
            ({ _id, firstName, lastName, occupation, location, picturePath})=>{
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err){
        res.status(404).json({ message: error.message });
    }
};