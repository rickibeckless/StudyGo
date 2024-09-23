import express from 'express';
import { getClasses, getClassesBySubject } from '../controllers/classesControllers.js';

const router = express.Router();

router.get('/', getClasses);
router.get('/subject/:subjectId', getClassesBySubject);

export default router;
