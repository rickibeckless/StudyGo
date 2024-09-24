import topicsData from '../data/topics.js';

export const getTopics = (req, res) => {
    res.json(unitsData);
};

export const getTopicsById = (req, res) => {
    const { subjectId, classId, unitId } = req.params;
    const topics = topicsData.filter(topic => topic.unitId === unitId);
    res.json(topics);
};