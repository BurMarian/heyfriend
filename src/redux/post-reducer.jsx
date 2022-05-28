import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const CREATE_POST = "heyfriend/postPage/CREATE_POST";

const initialState = {
  posts: [],
};

const PostPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case CREATE_POST: {
      let newPost = { ...action.data };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    default: {
      return state;
    }
  }
};

export const setPosts = (posts) => ({ type: SET_POSTS, posts });

export const createPost = (data) => ({ type: CREATE_POST, data });

// thunk
export const setPostsThunk = () => async (dispatch) =>
  await onSnapshot(collection(db, "posts"), (snapshot) => {
    // console.log(snapshot.docs);
    dispatch(setPosts(snapshot.docs));
  });

export const createPostThunk =
  ({ id, data }) =>
  async (dispatch) => {
    await addDoc(collection(db, "posts"), { ...data, accountId: id });

    dispatch(createPost({ ...data }));
  };

export default PostPage;
