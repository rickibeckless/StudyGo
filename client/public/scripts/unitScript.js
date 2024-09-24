const subjectId = window.location.pathname.split('/')[1];
const classId = window.location.pathname.split('/')[2];
const unitId = window.location.pathname.split('/')[3];

console.log(`subjectId, classId, unitId: ${subjectId}, ${classId}, ${unitId}`);

async function fetchSubject() {
    const res = await fetch(`/api/subjects/${subjectId}`);
    const subject = await res.json();
    fetchClasses();
    displaySubjectName(subject.name);
}

async function fetchClasses() {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();
    fetchUnit();
    displayClassName(classes.find(cls => cls.id === classId).name);
}

async function fetchUnit() {
    const res = await fetch(`/api/units/${subjectId}/${classId}/${unitId}`);
    const unit = await res.json();
    document.title = `${unit.name} | StudyGo`;
    displayUnit(unit);
    fetchTopics();
}

async function fetchTopics() {
    const res = await fetch(`/api/topics/${subjectId}/${classId}/${unitId}`);
    const topics = await res.json();
    console.log(topics);
    displayTopics(topics);
}

function displaySubjectName(subjectName) {
    const subjectLink = document.getElementById('subject-link');
    subjectLink.innerText = subjectName;
}

function displayClassName(className) {
    const classLink = document.getElementById('class-link');
    classLink.innerText = className;
}

function displayUnit(unit) {
    const unitLink = document.getElementById('unit-link');
    unitLink.innerText = unit.name;
}

function displayTopics(topics) {
    const topicList = document.getElementById('left-nav-topics-list');
    topics.forEach(topic => {
        const topicItemHolder = document.createElement('div');
        topicItemHolder.classList.add('topic-item-holder');
        topicItemHolder.id = `${topic.id}-topic-item-holder`;

        const topicItem = document.createElement('li');
        topicItem.classList.add('topic-item');
        topicItem.innerText = topic.name;

        topicList.appendChild(topicItemHolder);
        topicItemHolder.appendChild(topicItem);

        const topicDropdown = document.createElement('ul');
        topicDropdown.classList.add('topic-dropdown', 'hidden-dropdown');
        topicDropdown.id = `${topic.id}-topic-dropdown`;
        topicItemHolder.appendChild(topicDropdown);

        const subTopics = [topic.notes, topic.termdefs];

        subTopics.forEach(subTopic => {
            subTopic.forEach(subTopicItem => {
                const subTopicItemHolder = document.createElement('li');
                subTopicItemHolder.classList.add('sub-topic-item');
                subTopicItemHolder.innerText = subTopicItem;
                topicDropdown.appendChild(subTopicItemHolder);
            });
        });

        topicItem.addEventListener('click', () => {
            toggleTopicDropdown(topic);
        });
    });
}

function toggleTopicDropdown(topic) {
    console.log("clicked: ", topic);
    const topicDropdown = document.getElementById(`${topic.id}-topic-dropdown`);
    if (topicDropdown) {
        topicDropdown.classList.toggle('hidden-dropdown');
    }
}

fetchSubject();