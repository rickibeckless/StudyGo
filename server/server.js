import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import classesRoutes from './routes/classesRoutes.js';
import subjectsRoutes from './routes/subjectsRoutes.js';
import unitsRoutes from './routes/unitsRoutes.js';
import topicsRoutes from './routes/topicsRoutes.js';

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

app.get('/:subjectId/:classId/:unitId', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/units.html'));
});

app.get('/:subjectId/:classId', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/classes.html'));
});

app.get('/classes', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/classes.html'));
});

app.get('/subjects', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/subjects.html'));
});

app.get('/exams', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/exams.html'));
});

app.get('/units', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/units.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
