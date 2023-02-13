import { IMessage, IPost } from "../components/chat/common/interfaces";
import IPostsAction from "./common/interfaces";

interface IDefaultState {
    queuePosts: IMessage[];
    selected: IPost;
    isShowModal: boolean;
    isReload: boolean;
    order: string;
}

const defaultState: IDefaultState = {
    queuePosts: [],
    selected: {} as IPost,
    isShowModal: false,
    isReload: true,
    order: 'createdAt'
}

export const postsReducer = (state = defaultState, action: IPostsAction) => {
    switch (action.type) {
        case "ADD_ALL_POSTS":
            return { ...state, queuePosts: action.payload}
        case "SELECT_POST":
            return { ...state, selected: action.payload}
        case "SET_MODAL":
            return { ...state, isShowModal: action.payload}
        case "RELOAD":
            return { ...state, isReload: action.payload}
        case "ORDER_BY":
            return { ...state, order: action.payload}
        default:
            return state
    }
}
