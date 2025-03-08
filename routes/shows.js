import express from 'express';
const showsRouter = express.Router();


import {getShows, postShows} from '../controllers/showsControllers.js';

showsRouter.get('/', getShows);
showsRouter.post('/', postShows);

export default showsRouter;