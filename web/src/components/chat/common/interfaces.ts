export interface IPost {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    username: string;
    email: string;
    url: string;
    image: string;
    text: string;
    post_id: string;
    main_id: string;
}

export interface IPostForSend {
    username: string;
    email: string;
    url: string;
    image: string;
    text: string;
    post_id: string;
    main_id: string;
}

export interface IMessage {
    posts: IPost[]
    gaps: number[]
}