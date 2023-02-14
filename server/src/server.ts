import cors from 'cors';
import { createConnection } from 'typeorm';
const express = require('express');
const server = express();
const WSServer = require('express-ws')(server);
const aWss = WSServer.getWss()

import routes from './api/routes';
import notifyHandler from "./app";

import { env } from './config/env';

const { port } = env.app;

let { app } = WSServer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.ws('/', (ws: { on: (arg0: string, arg1: (msg: string) => void) => void; }) => {
    ws.on('message', (msg: string) => {
        notifyHandler(aWss, msg)
    })
})

app.listen(port, async () => {
    try {
        await createConnection({
            type: "postgres",
            host: env.db.host,
            port: env.db.port,
            username: env.db.username,
            database: env.db.name,
            password: env.db.password,
            entities: env.db.enititiesDir ? [env.db.enititiesDir] : [],
            synchronize: env.db.synchronize
        });
        console.log("Started...")
    } catch (error) {
        console.log(error)
    }
});

export default app;
