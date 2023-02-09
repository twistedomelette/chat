import { Express } from 'express';

import postRoute from "./post-route";

const routes = (app: Express): void => {
    app.use('/api/post', postRoute);
}

export default routes;