import { StateType } from "./store";

export const setPostsSelector = (state: StateType) => state.postPage.posts;

export const getCommentsSelector = (state: StateType) => state.postPage.comments;

export const setRepliesSelector = (state: StateType) => state.postPage.replies;

export const setLoadingSelector = (state: StateType) => state.postPage.loading;

export const setErrorSelector = (state: StateType) => state.postPage.error;
