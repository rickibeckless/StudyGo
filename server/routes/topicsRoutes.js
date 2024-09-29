import express from 'express';
import { getTopics, addTopic, addLessonToTopic, getTopicsById } from '../controllers/topicsControllers.js';

const router = express.Router();

router.get('/', getTopics);
router.post('/:subjectId/:classId/:unitId/new', addTopic);
router.post('/:subjectId/:classId/:unitId/:topicId/new-sub-topic', addLessonToTopic);
router.get('/:subjectId/:classId/:unitId', getTopicsById);

export default router;