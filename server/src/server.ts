import cors from 'cors';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';

import routes from './api/routes';

import { env } from './config/env';

const { port } = env.app;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: env.db.host,
            port: env.db.port,
            username: env.db.username,
            database: env.db.name,
            password: env.db.password,
            entities: env.db.enititiesDir ? [env.db.enititiesDir] : [],
            synchronize: env.db.synchronize
        });
        // console.log(connection)
        console.log("Started...")
    } catch (error) {
        console.log(error)
    }
});
export default app;
