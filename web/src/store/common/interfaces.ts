import { IMessage } from "../../components/chat/common/interfaces";

export default interface IPostsAction {
    type: string
    payload: IMessage[]
}

export default interface IPostState {
    queuePosts: IMessage[]
}