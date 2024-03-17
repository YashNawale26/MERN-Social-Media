import { createSlice } from '@reduxjs/toolkit';  //slice is a function that creates a slice object which is a collection of reducers and actions for a specific feature in the app

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({  //createSlice function takes an object with a name, initialState, and reducers. Name is the name of the slice, initialState is the initial state of the slice, and reducer functions are a set of reducer functions that can be dispatched to update the state
    name: 'auth',  //name is the name of the slice
    initialState,  //initialState is the initial state of the slice
    reducers: {    //reducers is an object with a set of reducer functions
        setMode: (state) => {  
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => { //if the setLogin action is dispatched, the user and token are set to the action payload which means the user is logged in
            state.user = action.payload.user;  // when the setLogin action is dispatched, the user object is passed as the action payload
            state.token = action.payload.token;// when the setLogin action is dispatched, the token is passed as the action payload
        },
        setLogout: (state) => {  // if the setLogout action is dispatched, the user and token are set to null
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;  // if the setFriends action is dispatched, the user's friends are set to the action payload 
            } else {
                console.error("User friends non-existent :("); // 
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
          },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {  // if the setPost action is dispatched, the posts are updated to the action payload
                if(post._id === action.payload.post_id){
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;  //export the setMode, setLogin, setLogout, setFriends, and setPost actions from the authSlice.actions object
export default authSlice.reducer;