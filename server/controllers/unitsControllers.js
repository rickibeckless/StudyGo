import unitsData from '../data/units.js';
import topicsData from '../data/topics.js';

export const getUnits = (req, res) => {
    res.json(unitsData);
};

export const getUnitById = (req, res) => {
    const { subjectId, classId, unitId } = req.params;
    const unit = unitsData.find(unit => unit.id === unitId);
    res.json(unit);
};

export const getTopicById = (req, res) => {
    const { subjectId, classId, unitId, topicId } = req.params;
    const topic = topicsData.find(topic => topic.id === topicId);
    res.json(topic);
};