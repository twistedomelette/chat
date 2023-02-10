import { Router } from 'express';
import { run } from '../../helpers/route.helper';
import { createPost, getPostsByMainId } from "../../services/post.service";

const router: Router = Router();

router
    .get(
        '/',
        run((req) => {
            // @ts-ignore
            return getPostsByMainId(req?.query.page)
        }),
    )
    .post(
        '/',
        run((req) => {
            // @ts-ignore
            return createPost(req.body)
        }),
    );

export default router;