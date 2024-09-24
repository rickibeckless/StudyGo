import unitsData from '../data/units.js';

export const getUnits = (req, res) => {
    res.json(unitsData);
};

export const getUnitById = (req, res) => {
    const { subjectId, classId, unitId } = req.params;
    const unit = unitsData.find(unit => unit.id === unitId);
    res.json(unit);
};