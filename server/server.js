import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import classesRoutes from './routes/classesRoutes.js';
import subjectsRoutes from './routes/subjectsRoutes.js';
import unitsRoutes from './routes/unitsRoutes.js';
import topicsRoutes from './routes/topicsRoutes.js';
import subjectData from './data/subjects.js';
import classData from './data/classes.js';
import unitData from './data/units.js';
import topicData from './data/topics.js';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use('/public', express.static(path.join(__dirname, '../client')));
app.use('/scripts', express.static(path.join(__dirname, '../client/public/scripts')));
app.use('/scripts', express.static(path.join(__dirname, '../client/scripts')));
app.use('/css', express.static(path.join(__dirname, '../client/css')));

app.use('/api/classes', classesRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/units', unitsRoutes);
app.use('/api/topics', topicsRoutes);

app.get('/subjects', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/subjects.html'));
});

app.get('/:subjectId/:classId/:unitId', (req, res) => {
    const { subjectId, classId, unitId } = req.params;
    if (isValidSubject(subjectId) && isValidClass(subjectId, classId) && isValidUnit(subjectId, classId, unitId)) {
        res.sendFile(path.join(__dirname, '../client/units.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
    }
});

app.get('/:subjectId/:classId', (req, res) => {
    const { subjectId, classId } = req.params;
    if (isValidSubject(subjectId) && isValidClass(subjectId, classId)) {
        res.sendFile(path.join(__dirname, '../client/classes.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
    }
});

app.get('/:subjectId', (req, res) => {
    const { subjectId } = req.params;
    if (isValidSubject(subjectId)) {
        res.sendFile(path.join(__dirname, '../client/classes.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
    }
});

app.get('/classes', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/classes.html'));
});

app.get('/exams', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/exams.html'));
});

app.get('/units', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/units.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

function isValidSubject(subjectId) {
    const validSubject = subjectData.find(subject => subject.id === subjectId);
    if (!validSubject) {
        return false;
    };

    return true;
}

function isValidClass(subjectId, classId) {
    const validClass = classData.find(cls => cls.id === classId && cls.subjectId === subjectId);
    if (!validClass) {
        return false;
    };

    return true;
}

function isValidUnit(subjectId, classId, unitId) {
    const validUnit = unitData.find(unit => unit.id === unitId && unit.classId === classId && unit.subjectId === subjectId);
    if (!validUnit) {
        return false;
    };

    return true;
}

app.listen(PORT, () => {
    console.log(`Server running on 'http://localhost:${PORT}'`);
});