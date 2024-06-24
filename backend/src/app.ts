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
import stripTags from "./middlewares/strip-tags";
import limiter from "./middlewares/limiter";

const server = express();
server.use(limiter);
server.use(cors());   
server.use(authentication);  
server.use(userLogger);  
server.use(express.json()); 
server.use(expressFileUpload());  

server.use(stripTags);

server.use('/api', authRouter);
server.use('/api/vacations', vacationsRouter);  
server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))));
server.use('/api/followers', followersRouter);

// Special middleware for 'not found' error:
server.use(notFound);

// Error middlewares:
server.use(errorLogger); 
server.use(errorHandler);

export default server;