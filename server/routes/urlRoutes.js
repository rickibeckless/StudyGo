import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/database.js';
// import subjectData from '../data/subjects.js';
// import classData from '../data/classes.js';
// import unitData from '../data/units.js';
// import topicData from '..//data/topics.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validUrls = ['subjects', 'classes', 'units'];

const isValidUrl = (url) => {
    return validUrls.includes(url);
}

router.get('/subjects', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/subjects.html'));
});

router.get('/:subjectId/:classId/:unitId', (req, res) => {
    const { subjectId, classId, unitId } = req.params;
    if (isValidSubject(subjectId) && isValidClass(subjectId, classId) && isValidUnit(subjectId, classId, unitId)) {
        res.sendFile(path.join(__dirname, '../../client/units.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../../client/404.html'));
    }
});

router.get('/:subjectId/:classId', (req, res) => {
    const { subjectId, classId } = req.params;
    if (isValidSubject(subjectId) && isValidClass(subjectId, classId)) {
        res.sendFile(path.join(__dirname, '../../client/classDetails.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../../client/404.html'));
    }
});

router.get('/:subjectId', (req, res) => {
    const { subjectId } = req.params;
    if (isValidUrl(subjectId)) {
        res.sendFile(path.join(__dirname, `../../client/${subjectId}.html`));
    } else if (isValidSubject(subjectId)) {
        res.sendFile(path.join(__dirname, '../../client/classes.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../../client/404.html'));
    }
});

router.get('/classes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/classes.html'));
});

router.get('/units', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/units.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

async function isValidSubject(subjectId) {
    // const validSubject = subjectData.find(subject => subject.id === subjectId);
    const validSubject = await pool.query('SELECT * FROM subjects WHERE unique_string_id = $1', [subjectId]);
    if (!validSubject) {
        return false;
    };

    return true;
}

async function isValidClass(subjectId, classId) {
    // const validClass = classData.find(cls => cls.id === classId && cls.subjectId === subjectId);
    const validClass = await pool.query('SELECT * FROM classes WHERE unique_string_id = $1 AND subjectid = $2', [classId, subjectId]);
    if (!validClass) {
        return false;
    };

    return true;
}

async function isValidUnit(subjectId, classId, unitId) {
    // const validUnit = unitData.find(unit => unit.id === unitId && unit.classId === classId && unit.subjectId === subjectId);
    const validUnit = await pool.query('SELECT * FROM units WHERE unique_string_id = $1 AND classid = $2 AND subjectid = $3', [unitId, classId, subjectId]);
    if (!validUnit) {
        return false;
    };

    return true;
}

export default router;