import express from 'express';
import { getUnits, getUnitById, getTopicById } from '../controllers/unitsControllers.js';

const router = express.Router();

router.get('/', getUnits);
router.get('/:subjectId/:classId/:unitId', getUnitById);
router.get('/:subjectId/:classId/:unitId/:topicId', getTopicById);

export default router;