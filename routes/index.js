import express from 'express';

const router = express.Router();

import actorsRouter from './actors.js';
import showsRouter from './shows.js';

router.use('/api/v1/actors', actorsRouter);
router.use('/api/v1/shows', showsRouter);

export default router;