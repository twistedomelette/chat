import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import App from "./App";
import IPostsAction from "./store/common/interfaces";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const defaultState = {
    queuePosts: []
}
const reducer = (state = defaultState, action: IPostsAction) => {
    switch (action.type) {
        case "ADD_POST":
            return { ...state, queuePosts: [ ...state.queuePosts, action.payload ]}
        case "ADD_ALL_POSTS":
            return { ...state, queuePosts: action.payload}
        default:
            return state
    }
}
// @ts-ignore
const store = createStore(reducer)

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
