import { Post } from "../data/entities/post";

interface IPost {
    username: string;
    email: string;
    url: string;
    image: string;
    text: string;
    post_id: string;
    main_id: string;
}

export const createPost = async (
    data: Post | undefined,
): Promise<Post> => {
    if (!data) {
        throw new Error('Data is wrong');
    }
    const newPost = Post.create({
        username: data.username,
        email: data.email,
        url: data.url,
        image: data.image,
        text: data.text,
        post_id: data.post_id,
        main_id: data.main_id,
    })

    await newPost.save()

    return newPost
};

export const getPostsByMainId = async (
    mainId: string
): Promise<Post[]> => {
    if (!mainId) {
        throw new Error('No required field username');
    }
    const posts: Post[] = await Post.find({
        where: {
            main_id: mainId,
        },
        order: {
            createdAt: "DESC"
        }
    })

    return posts
};


