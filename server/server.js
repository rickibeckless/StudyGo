import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import classesRoutes from './routes/classesRoutes.js';
import subjectsRoutes from './routes/subjectsRoutes.js';
import urlRoutes from './routes/urlRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use('/public', express.static(path.join(__dirname, '../client/public')));

app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/scripts', express.static(path.join(__dirname, '../client/public/scripts')));

app.use('/api/classes', classesRoutes);
app.use('/api/subjects', subjectsRoutes);

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
