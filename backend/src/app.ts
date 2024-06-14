import express from "express";
import expressFileUpload from 'express-fileupload';
import vacationsRouter from './routers/vacations';
import authRouter from './routers/auth';
import followersRouter from './routers/followers';
import config from "config";
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import cors from 'cors';
import path from "path";
import { errorLogger } from "./middlewares/error-logger";
import authentication from "./middlewares/authentication";
import userLogger from "./middlewares/user-logger";
import enforceAuth from "./middlewares/enforce-auth";

const server = express();
server.use(cors());   // allow all the servers permissions to use the backend server. 
server.use(authentication);  // check who is the user, and update his jwt if there is any changes.
server.use(userLogger);  // log what the user/guest doing
server.use(express.json()); 
server.use(expressFileUpload());  // if its multipart form, this middleware will activated. good for uploading images.

server.use('/api', authRouter);
server.use('/api/vacations', vacationsRouter);  // 'enforceAuth'- instead we can write it in routers -> vacations.
// server.use('/api/vacations', enforceAuth, vacationsRouter);  // 'enforceAuth'- instead we can write it in routers -> vacations.
server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))));
// server.use('/api/vacations', vacationsRouter);  
// server.use('/images', express.static('src/assets/images'));
// server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))));  // DELETE IT???
server.use('/api/followers', followersRouter);

// special middleware for 'not found' error:
server.use(notFound);

// error middlewares:
// server.use(errorLogger);  // CONSIDER TO DELETE!
server.use(errorHandler);

export default server;