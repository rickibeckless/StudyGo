import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../client/public');

export const homeUrl = (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
};

export const subjectUrl = (req, res) => {
    res.sendFile(path.join(publicPath, 'subjects.html'));
};

export const classUrl = (req, res) => {
    res.sendFile(path.join(publicPath, 'classes.html'));
};

export const unitUrl = (req, res) => {
    res.sendFile(path.join(publicPath, 'units.html'));
};