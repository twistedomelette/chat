import { Post } from "../data/entities/post";
import { In, IsNull } from "typeorm";
import { PAGE_LIMIT } from "../helpers/constants/pagination.helper";


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
    page: number
): Promise<Post[]> => {
    if (!page) {
        page = 1
    }
    const mainPosts: Post[] = await Post.find({
        where: {
            post_id: IsNull(),
        },
        order: {
            createdAt: "DESC"
        }
    })

    let mainIdsPosts = mainPosts.map(el => el.id)

    mainIdsPosts = mainIdsPosts.splice(PAGE_LIMIT*(page-1), PAGE_LIMIT)

    const posts: Post[] = await Post.find({
        where: {
            main_id: In(mainIdsPosts)
        },
        order: {
            createdAt: "DESC"
        }
    })

    return posts
};


