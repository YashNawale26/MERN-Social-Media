import Post from '../models/Post.js';

/* CREATE */ 
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await UserActivation.findById(userId);
        const newPost = new Post({
            UserId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: err.message + "Error in getFeedPosts"})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId: userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message + "Error in getUserPosts"});
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(!isLiked){
            post.likes.delete(userId); // unlike
        } else {
            post.likes.set(userId, true); // like
        }
        
        const updatedPost = await Post.findByIdAndUpdate( // update post
            id,
            { likes: post.likes },
            { new: true } // return updated post
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}