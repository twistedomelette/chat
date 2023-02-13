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
    image: File | string;
    text: string;
    post_id: string;
    main_id: string;
}

export interface IPostTake {
    username: boolean;
    email: boolean;
    text: boolean;
}

export interface IPostErrors {
    username: string;
    email: string;
    url : string
    image: string;
    text: string;
    captcha: string;
}

export interface IMessage {
    posts: IPost[]
    gaps: number[]
}