import subjectData from '../data/subjects.js';

export const getSubjects = (req, res) => {
    res.json(subjectData);
};
