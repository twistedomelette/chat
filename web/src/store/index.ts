import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore } from "redux";
import { postsReducer } from "./postsReducer";

const rootReducer = combineReducers({
    posts: postsReducer,
})
export const store = createStore(rootReducer, composeWithDevTools())