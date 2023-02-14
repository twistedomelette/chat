import { IMessage, IPost } from "../../components/chat/common/interfaces";


export default interface IPostsAction {
    type: string
    payload: IMessage[] | IPost
}

interface IPostReducer {
    queuePosts: IMessage[]
    selected: IPost | null
    isShowModal: boolean;
    isReload: boolean
    order: string
}

export default interface IPostState {
    posts: IPostReducer
}