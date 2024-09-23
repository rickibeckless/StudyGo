import express from 'express';
import cors from 'cors';

import classesRoutes from './routes/classesRoutes.js';
import subjectsRoutes from './routes/subjectsRoutes.js';
import urlRoutes from './routes/urlRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use('/public', express.static('public'));
app.use('/scripts', express.static('scripts'));

app.use('/api/classes', classesRoutes);
app.use('/api/subjects', subjectsRoutes);

app.use('/', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
