import uploadImage from "../common/upload-image";
import { env } from "../config/env";
import { Post } from "../data/entities/post";
import { In, IsNull } from "typeorm";
import { PAGE_LIMIT } from "../helpers/constants/pagination.helper";
import { v4 as uuidv4 } from 'uuid';


export interface IPostForSend {
    username: string;
    email: string;
    url: string;
    image: Express.Multer.File;
    text: string;
    post_id: string | undefined;
    main_id: string | undefined;
}

export const createPost = async (
    data: IPostForSend | undefined,
    file: Express.Multer.File | undefined
): Promise<Post> => {
    if (!data) {
        throw new Error('Data is wrong');
    }

    const props = {
        secret: env.aws.secret || '',
        access: env.aws.access || '',
        bucketName: env.aws.bucket || '',
    };

    let image
    if (file)
        image = await uploadImage({ ...props, file: file });

    const id = uuidv4()
    let newPost
    if (data.post_id) {
        newPost = Post.create({
            id: id,
            username: data.username,
            email: data.email,
            url: data.url,
            image: image?.Location || '',
            text: data.text,
            post_id: data.post_id,
            main_id: data.main_id,
        })
    } else {
        newPost = Post.create({
            id: id,
            username: data.username,
            email: data.email,
            url: data.url,
            image: image?.Location || '',
            text: data.text,
            main_id: id,
        })
    }
    await newPost.save()

    return newPost
};

export const getPosts = async (
    page: number,
    order: string
): Promise<Post[]> => {
    if (!page) {
        page = 1
    }
    const mainPosts: Post[] = await Post.find({
        where: {
            post_id: IsNull(),
        },
        order: {
            [order]: "DESC"
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


