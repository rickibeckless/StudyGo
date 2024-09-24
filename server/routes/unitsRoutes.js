import express from 'express';
import { getUnits, getUnitById } from '../controllers/unitsControllers.js';

const router = express.Router();

router.get('/', getUnits);
router.get('/:subjectId/:classId/:unitId', getUnitById);

export default router;