import express from 'express';
import { getClasses, getClassesBySubject, getUnitsByClass, getUnitsById } from '../controllers/classesControllers.js';

const router = express.Router();

router.get('/', getClasses);
router.get('/:subjectId', getClassesBySubject);
router.get('/:subjectId/:classId', getUnitsByClass);
router.get('/:subjectId/:classId/:unitId', getUnitsById);

export default router;
