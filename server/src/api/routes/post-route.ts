import { Router } from 'express';
import { run } from '../../helpers/route.helper';
import { createPost, getPosts } from "../../services/post.service";
import multer from "multer";


const router: Router = Router();
const upload = multer();

router
    .get(
        '/',
        run((req) => {
            return getPosts(req?.query.page, req?.query.order)
        }),
    )
    .post(
        '/',
        upload.single('image'),
        run((req) => {
            return createPost(req?.body, req?.file)
        }),
    );

export default router;