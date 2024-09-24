import subjectData from '../data/subjects.js';

export const getSubjects = (req, res) => {
    res.json(subjectData);
};

export const getSubjectsById = (req, res) => {
    const subject = subjectData.find(subject => subject.id === req.params.subjectId);
    res.json(subject);
};