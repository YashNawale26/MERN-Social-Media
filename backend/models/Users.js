import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    friends: {
        type: Array,
        default: [],
    }, 
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, {timestamps: true} // auto create createdAt and updatedAt timestamps
); 

const User = mongoose.model("User", UserSchema); // create a model from the schema in the database

export default User;