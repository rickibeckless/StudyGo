import classesData from '../data/classes.js';

export const getClasses = (req, res) => {
    res.json(classesData);
};

// Route to get classes by subject id
export const getClassesBySubject = (req, res) => {
    const subjectId = req.params.subjectId;
    const classes = classesData.filter((cls) => cls.subjectId === subjectId);
    res.json(classes);
};