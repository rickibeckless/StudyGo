import express from 'express';
import { getTopics, getTopicsById } from '../controllers/topicsControllers.js';

const router = express.Router();

router.get('/', getTopics);
router.get('/:subjectId/:classId/:unitId', getTopicsById);

export default router;