const subjectId = window.location.pathname.split('/')[1];
const classId = window.location.pathname.split('/')[2];
const unitId = window.location.pathname.split('/')[3];

const currentTopic = localStorage.getItem('currentTopic');
const currentSubTopicType = localStorage.getItem('currentSubTopicType');
const currentSubTopicId = localStorage.getItem('currentSubTopic-topicId');
const currentSubTopicFullId = localStorage.getItem('currentSubTopic-id');

// navigate to the current topic and subtopic

// async function navigateToCurrentTopic() {
//     if (currentTopic) {
//         const topicItem = document.getElementById(currentTopic);
//         if (topicItem) {
//             topicItem.click();
//         }
//         const subTopicItem = document.getElementById(currentSubTopicId);
//         if (subTopicItem) {
//             subTopicItem.click();
//         }
//         displayRightNavContent();
//         //displayRightContent();
//     }
// }

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
    fetchTopics(unit);
}

async function fetchTopics(unit) {
    const res = await fetch(`/api/topics/${subjectId}/${classId}/${unitId}`);
    const topics = await res.json();
    displayTopics(topics);
    displayIntroOutroTopics(unit);
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
    const defaultUnitLink = document.getElementById('unit-link');
    const unitLink = document.createElement('h3');
    unitLink.innerText = unit.name;
    defaultUnitLink.parentNode.replaceChild(unitLink, defaultUnitLink);
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

        const topicNotes = topic.notes;
        const topicTermdefs = topic.termdefs;

        //console.log("topicNotes: ", topicNotes);
        //console.log("topicTermdefs: ", topicTermdefs);

        const subTopicTotalIndex = document.createElement('span');
        subTopicTotalIndex.innerText = topicNotes.length + topicTermdefs.length;
        subTopicTotalIndex.classList.add('sub-topic-total-index');
        //console.log(topic.name, "subTopicTotalIndex: ", subTopicTotalIndex);

        topicItem.appendChild(subTopicTotalIndex);

        //const selectedIndex = document.createElement('span');
        //selectedIndex.innerText = '0';

        //const subTopics = [topic.notes, topic.termdefs];

        // subTopics.forEach(subTopic => {
        //     subTopic.forEach(subTopicItem => {
        //         const subTopicItemHolder = document.createElement('li');
        //         subTopicItemHolder.classList.add('sub-topic-item');
        //         subTopicItemHolder.innerText = subTopicItem;
        //         topicDropdown.appendChild(subTopicItemHolder);
        //     });
        // });

        const notesHolder = document.createElement('li');
        notesHolder.id = `${topic.id}-notes`;
        notesHolder.classList.add('sub-topic-item');
        notesHolder.innerText = 'Notes';
        topicDropdown.appendChild(notesHolder);

        const termdefsHolder = document.createElement('li');
        termdefsHolder.id = `${topic.id}-termdefs`;
        termdefsHolder.classList.add('sub-topic-item');
        termdefsHolder.innerText = 'Term/Definitions';
        topicDropdown.appendChild(termdefsHolder);

        notesHolder.addEventListener('click', () => {
            localStorage.setItem('currentTopic', topic.name);
            localStorage.setItem('currentSubTopicType', 'notes');
            localStorage.setItem('currentSubTopic-topicId', topic.id);
            localStorage.setItem('currentSubTopic-id', `${topic.id}-notes`);
            //selectedIndex.innerText = subTopics[0].length;
            displayRightNavContent();
            displayRightContent(topicNotes);
        });

        termdefsHolder.addEventListener('click', () => {
            localStorage.setItem('currentTopic', topic.name);
            localStorage.setItem('currentSubTopicType', 'termdefs');
            localStorage.setItem('currentSubTopic-topicId', topic.id);
            localStorage.setItem('currentSubTopic-id', `${topic.id}-termdefs`);
            //selectedIndex.innerText = subTopics[1].length;
            displayRightNavContent();
            displayRightContent(topicTermdefs);
        });

        topicItem.addEventListener('click', () => {
            toggleTopicDropdown(topic);
        });
    });

    //navigateToCurrentTopic();
};

function toggleTopicDropdown(topic) {
    const topicDropdown = document.getElementById(`${topic.id}-topic-dropdown`);
    if (topicDropdown) {
        topicDropdown.classList.toggle('hidden-dropdown');
    };
};

/*
    each unit overview will display the units description, learning objectives,
    unit outcome, prerequisites, and the unit topics
*/

function displayIntroOutroTopics(unit) {
    const introTopic = document.createElement('li');
    introTopic.classList.add('topic-item');
    introTopic.innerText = 'Overview';
    introTopic.id = `${unitId}-intro-topic`;
    introTopic.addEventListener('click', () => {
        localStorage.setItem('currentSubTopic-topicId', `${unitId}-main-overview`);
        localStorage.setItem('currentSubTopicType', 'main-overview');
        localStorage.setItem('currentTopic', 'Overview');
        localStorage.removeItem('currentSubTopic-id');
        displayRightNavContent();
        displayRightContent(unit);
    });

    const outroTopic = document.createElement('li');
    outroTopic.classList.add('topic-item');
    outroTopic.innerText = 'Summary';
    outroTopic.id = `${unitId}-outro-topic`;
    outroTopic.addEventListener('click', () => {
        localStorage.setItem('currentSubTopic-topicId', `${unitId}-main-summary`);
        localStorage.setItem('currentSubTopicType', 'main-summary');
        localStorage.setItem('currentTopic', 'Summary');
        localStorage.removeItem('currentSubTopic-id');
        displayRightNavContent();
        displayRightContent(unit);
    });

    const topicList = document.getElementById('left-nav-topics-list');
    topicList.insertBefore(introTopic, topicList.firstChild);
    topicList.appendChild(outroTopic);
}

function displayRightNavContent() {
    const rightNav = document.getElementById('right-nav');
    const customRightNavBorder = document.createElement('div');
    customRightNavBorder.id = 'custom-right-nav-border';

    const rightNavList = document.getElementById('right-nav-list');
    const currentTopic = localStorage.getItem('currentTopic');
    const currentSubTopicType = localStorage.getItem('currentSubTopicType');
    const currentSubTopicId = localStorage.getItem('currentSubTopic-topicId');

    const currentSubTopic = currentSubTopicType === 'notes' ? 'Notes' : currentSubTopicType === 'termdefs' ? 'Term/Definitions'  : '';
    
    const currentTopicOverSummary = currentSubTopicType === 'main-summary' ? 'Summary' : currentSubTopicType === 'main-overview' ? 'Overview' : '';

    if (currentSubTopic) {
        const currentTopicHolder = document.createElement('li');
        currentTopicHolder.classList.add('current-topic-holder');
        currentTopicHolder.innerText = currentTopic;

        const currentSubTopicHolder = document.createElement('li');
        currentSubTopicHolder.classList.add('current-sub-topic-holder');
        currentSubTopicHolder.innerText = currentSubTopic;

        const nextSubTopicBtn = document.createElement('button');
        nextSubTopicBtn.id = 'next-sub-topic-btn';
        nextSubTopicBtn.innerText = 'Next';

        nextSubTopicBtn.addEventListener('click', () => {
            goToNextSubTopic();
        });

        const rightNavDivider = document.createElement('li');
        rightNavDivider.classList.add('right-nav-divider');
        rightNavDivider.innerText = '/';

        rightNav.innerHTML = '';
        rightNavList.innerHTML = '';
        rightNavList.appendChild(currentTopicHolder);
        rightNavList.appendChild(rightNavDivider);
        rightNavList.appendChild(currentSubTopicHolder);
        rightNavList.appendChild(nextSubTopicBtn);
        rightNav.appendChild(rightNavList);
        rightNav.appendChild(customRightNavBorder);
    };

    if (currentTopicOverSummary) {
        const currentTopicHolder = document.createElement('li');
        currentTopicHolder.classList.add('current-topic-holder');
        currentTopicHolder.innerText = currentTopic;

        const nextSubTopicBtn = document.createElement('button');
        nextSubTopicBtn.id = 'next-sub-topic-btn';
        nextSubTopicBtn.innerText = 'Next';

        nextSubTopicBtn.addEventListener('click', () => {
            goToNextSubTopic();
        });

        rightNav.innerHTML = '';
        rightNavList.innerHTML = '';
        rightNavList.appendChild(currentTopicHolder);
        rightNavList.appendChild(nextSubTopicBtn);
        rightNav.appendChild(rightNavList);
        rightNav.appendChild(customRightNavBorder);
    };
};

function goToNextSubTopic() {
    const currentSubTopic = localStorage.getItem('currentSubTopicType');
    const currentSubTopicId = localStorage.getItem('currentSubTopic-topicId');
    const currentSubTopicFullId = localStorage.getItem('currentSubTopic-id');

    const topicDropdown = document.getElementById(`${currentSubTopicId}-topic-dropdown`);
    const topicDropdownItems = topicDropdown.childNodes;
    const topicDropdownItemsArray = Array.from(topicDropdownItems);

    const nextSubTopicIndex = topicDropdownItemsArray.findIndex(item => item.id === currentSubTopicFullId) + 1;
    const nextSubTopic = topicDropdownItemsArray[nextSubTopicIndex];

    if (nextSubTopic) {
        nextSubTopic.click();
    } else {
        const topicItemHolder = document.getElementById(`${currentSubTopicId}-topic-item-holder`);
        const nextTopicItemHolder = topicItemHolder.nextElementSibling;
        
        if (nextTopicItemHolder) {
            const nextSubTopic = nextTopicItemHolder.childNodes[1].childNodes[0];
            if (nextSubTopic) {
                if (nextTopicItemHolder.childNodes[1].classList.contains('hidden-dropdown')) {
                    nextTopicItemHolder.firstChild.click();
                }
                nextSubTopic.click();
            }
        }
    };
};

function displayRightContent(content) {
    const rightContent = document.getElementById('right-content');
    rightContent.innerHTML = '';

    const currentSubTopicType = localStorage.getItem('currentSubTopicType');

    const currentSubTopic = currentSubTopicType === 'notes' ? 'Notes' : 'Term/Definitions';
    if (currentSubTopicType === 'notes') {
        content.forEach(note => {
            const noteHolder = document.createElement('ul');
            noteHolder.classList.add('note-holder');

            const noteItem = document.createElement('li');
            noteItem.classList.add('note');
            noteItem.innerText = note;

            noteHolder.appendChild(noteItem);
            rightContent.appendChild(noteHolder);
        });
    } else if (currentSubTopicType === "termdefs") {
        content.forEach(termdef => {
            const termdefHolder = document.createElement('div');
            termdefHolder.classList.add('termdef-holder');

            const term = document.createElement('h4');
            term.classList.add('term');
            term.innerText = termdef.term;

            const definitionHolder = document.createElement('ul')
            definitionHolder.classList.add('definition-holder');

            if (Array.isArray(termdef.definition)) {
                termdef.definition.forEach(definition => {
                    const definitionItem = document.createElement('li');
                    definitionItem.classList.add('definition');
                    definitionItem.innerHTML = `
                        <span class="definition-bullet">\u2605</span>
                        ${definition}
                    `;
                    definitionHolder.appendChild(definitionItem);
                });
            } else {
                const definition = document.createElement('li');
                definition.classList.add('definition');
                definition.innerHTML = `
                    <span class="definition-bullet">\u2605</span>
                    ${termdef.definition}
                `;

                definitionHolder.appendChild(definition);
            }

            termdefHolder.appendChild(term);
            termdefHolder.appendChild(definitionHolder);
            rightContent.appendChild(termdefHolder);
        });
    } else if (currentSubTopicType === 'main-overview') {
        const unitOverview = document.createElement('dl');
        unitOverview.classList.add('unit-overview');

        const unitDescriptionTitle = document.createElement('dt');
        unitDescriptionTitle.classList.add('unit-description-title');
        unitDescriptionTitle.innerText = 'Description:';

        const unitDescription = document.createElement('dd');
        unitDescription.classList.add('unit-description');
        unitDescription.innerText = content.description;

        const prerequisitesTitle = document.createElement('dt');
        prerequisitesTitle.classList.add('prerequisites-title');
        prerequisitesTitle.innerText = 'Prerequisites:';

        const prerequisites = document.createElement('dd');
        prerequisites.classList.add('prerequisites');
        prerequisites.innerText = content.prerequisites;

        const learningObjectivesTitle = document.createElement('dt');
        learningObjectivesTitle.classList.add('learning-objectives-title');
        learningObjectivesTitle.innerText = 'Learning Objectives:';

        const learningObjectives = document.createElement('ul');
        learningObjectives.classList.add('learning-objectives');
        content.learningObjectives.forEach(objective => {
            const objectiveItem = document.createElement('li');
            objectiveItem.classList.add('objective-item');
            objectiveItem.innerText = objective;
            learningObjectives.appendChild(objectiveItem);
        });

        const unitOutcomeTitle = document.createElement('dt');
        unitOutcomeTitle.classList.add('unit-outcome-title');
        unitOutcomeTitle.innerText = 'Outcome:';

        const unitOutcome = document.createElement('dd');
        unitOutcome.classList.add('unit-outcome');
        unitOutcome.innerText = content.unitOutcome;

        unitOverview.appendChild(unitDescriptionTitle);
        unitOverview.appendChild(unitDescription);
        unitOverview.appendChild(prerequisitesTitle);
        unitOverview.appendChild(prerequisites);
        unitOverview.appendChild(learningObjectivesTitle);
        unitOverview.appendChild(learningObjectives);
        unitOverview.appendChild(unitOutcomeTitle);
        unitOverview.appendChild(unitOutcome);
        rightContent.appendChild(unitOverview);
    } else if (currentSubTopicType === 'main-summary') {
        // want to have total number of notes and termdefs
        // all topic names
        // later on (when starring is set up) total number of starred notes and termdefs

    };
};

fetchSubject();
//navigateToCurrentTopic();