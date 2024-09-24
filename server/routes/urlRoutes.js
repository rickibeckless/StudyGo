import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
    console.log("HEY2");
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/classes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/classes.html'));
});

router.get('/subjects', (req, res) => {
    console.log("HEY");
    res.sendFile(path.join(__dirname, '../../client/public/subjects.html'));
});

router.get('/exams', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/exams.html'));
});

router.get('/tests', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/tests.html'));
});

router.get('/topics', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/topics.html'));
});

export default router;