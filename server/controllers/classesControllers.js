import classesData from '../data/classes.js';
import unitsData from '../data/units.js';

export const getClasses = (req, res) => {
    res.json(classesData);
};

// Route to get classes by subject id
export const getClassesBySubject = (req, res) => {
    const subjectId = req.params.subjectId;
    const classes = classesData.filter((cls) => cls.subjectId === subjectId);
    res.json(classes);
};

// Route to get units by class id
export const getUnitsByClass = (req, res) => {
    const subjectId = req.params.subjectId;
    const classId = req.params.classId;
    const cls = classesData.find((cls) => cls.subjectId === subjectId && cls.id === classId);
    res.json(cls);
};

// Route to get units by unit id
export const getUnitsById = (req, res) => {
    const subjectId = req.params.subjectId;
    const classId = req.params.classId;
    const unitId = req.params.unitId;
    const unit = unitsData.find((unit) => unit.subjectId === subjectId && unit.classId === classId && unit.id === unitId);
    res.json(unit);
};