// const subjectId = window.location.pathname.split('/')[1];
// const classId = window.location.pathname.split('/')[2];

// async function fetchSubject() {
//     const res = await fetch(`/api/subjects/${subjectId}`);
//     const subject = await res.json();
//     document.title = `${subject.name} | StudyGo`;
//     fetchClasses(subjectId);
// }

// async function fetchClasses(subjectId) {
//     const res = await fetch(`/api/classes/${subjectId}`);
//     const classes = await res.json();
//     displayClass(classes.find(cls => cls.id === classId));
// }

// function displayClass(classDetail) {
//     const classHolder = document.createElement('ul');
//     const classItem = document.createElement('li');
//     classItem.classList.add('class');
//     classItem.innerText = classDetail.name;
//     classHolder.appendChild(classItem);

//     fetchUnits(classDetail.id);
//     document.body.appendChild(classHolder);
// }

// async function fetchUnits(classId) {
//     const res = await fetch(`/api/classes/${subjectId}/${classId}`);
//     const data = await res.json();
//     console.log(data);
//     data.unitIds.forEach(unit => {
//         // unit is the unit ids. now use the unit ids to fetch the unit details

//         fetchUnit(unit);

//         // const unitItem = document.createElement('li');
//         // unitItem.innerText = unit;
//         // document.body.appendChild(unitItem);
//     });
// }

// async function fetchUnit(unitId) {
//     const res = await fetch(`/api/classes/${subjectId}/${classId}/${unitId}`);
//     const unit = await res.json();
//     console.log(unit);
//     displayUnit(unit);
// }

// function displayUnit(unit) {
//     const unitHolder = document.createElement('ul');
//     const unitItem = document.createElement('li');
//     unitItem.classList.add('unit');
//     unitItem.innerText = unit.name;
//     unitHolder.appendChild(unitItem);
//     document.body.appendChild(unitHolder);
// }

// fetchSubject();

async function fetchSubject(subjectId) {
    const res = await fetch(`/api/subjects/${subjectId}`);
    const subject = await res.json();
    //document.title = `${subject.name} | StudyGo`;
}

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();
    //displayClass(classes.find(cls => cls.id === classId));
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    let subjectId = null;
    let classId = null;

    if (currentPath === '/classes') {
        displayGeneralClassesPage();
    } else if (pathSegments.length === 1) {
        subjectId = pathSegments[0];
        displaySubjectPage(subjectId);
    }

    if (subjectId !== null) {
        fetchSubject(subjectId);
    }
    if (classId !== null) {
        fetchClasses(subjectId);
    }
});

async function displayGeneralClassesPage() {
    console.log('Displaying all classes');
    document.title = 'All Classes | StudyGo';
    /**
     * Will display all classes for all subjects.
     * Each class will have a preview of the class information.
     * Each class will have a button to view all units, which takes you to the class page (displayClassPage).
     */
};

async function displaySubjectPage(subjectId) {
    console.log(`Displaying subject page for subject ID: ${subjectId}`);
    /**
     * Will display all classes for the subject.
     * Will have all subject information.
     * Each class will have almost all of the class information.
     * Only the top 5 units of a class will be displayed.
     * Will have a button to view all units, which takes you to the class page (displayClassPage).
     */
    fetchClasses(subjectId);

    const subjectRes = await fetch(`/api/subjects/${subjectId}`);
    const subject = await subjectRes.json();

    document.title = `${subject[0].name} Classes | StudyGo`;

    const classRes = await fetch(`/api/classes/${subjectId}`);
    const classes = await classRes.json();

    const classesSection = document.getElementById('subjects-section');

    const classHeader = document.createElement('h2');
    classHeader.innerText = `All ${subject[0].name} Classes`;

    const classList = document.createElement('ul');
    classList.id = "subject-list";

    let lastOpenedUnitDropdown = null;
    let lastShownDescription = null;

    for (const clsObj of classes) {
        const unitRes = await fetch(`/api/classes/${subjectId}/${clsObj.unique_string_id}`);
        const units = await unitRes.json();

        const classHolder = document.createElement('div');
        classHolder.classList.add('subject-holder');
        classHolder.id = clsObj.unique_string_id;

        const className = document.createElement('li');
        className.classList.add('subject');
        className.innerText = clsObj.name;

        const viewAllUnitsLink = document.createElement('a');
        viewAllUnitsLink.href = `/${subjectId}/${clsObj.unique_string_id}`;
        viewAllUnitsLink.title = viewAllUnitsLink.href;
        viewAllUnitsLink.classList.add('view-all-classes-link');
        viewAllUnitsLink.innerText = `(all ${clsObj.name} units \u2192)`;

        const classDescription = document.createElement('p');
        classDescription.classList.add('subject-description');
        classDescription.innerText = clsObj.description;

        const filteredUnits = units.filter(unit => unit.classid === clsObj.unique_string_id);

        const clsUnitCountNum = filteredUnits.length;

        const countAndButtonHolder = document.createElement('div');
        countAndButtonHolder.classList.add('count-and-button-holder');

        const clsUnitCount = document.createElement('p');
        clsUnitCount.classList.add('subject-class-count');

        if (clsUnitCountNum === 1) {
            clsUnitCount.innerHTML = `<span class="subject-class-count-number">${clsUnitCountNum}</span> unit`;
        } else {
            clsUnitCount.innerHTML = `<span class="subject-class-count-number">${clsUnitCountNum}</span> units`;
        };

        const addUnitButton = document.createElement('button');
        addUnitButton.classList.add('add-class-button');
        addUnitButton.title = 'Add a unit';
        addUnitButton.innerText = '+';

        addUnitButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            openUnitFormModal(subjectId, clsObj.unique_string_id);
        });

        classHolder.addEventListener('click', () => {
            const unitDropdown = document.getElementById(`${clsObj.unique_string_id}-class-dropdown`);

            if (lastOpenedUnitDropdown && lastOpenedUnitDropdown !== unitDropdown) {
                lastOpenedUnitDropdown.classList.add('hidden-dropdown');
            }

            if (lastShownDescription && lastShownDescription !== classDescription) {
                lastShownDescription.style.display = 'flex';
            }

            unitDropdown.classList.toggle('hidden-dropdown');

            if (!unitDropdown.classList.contains('hidden-dropdown')) {
                classDescription.style.display = 'none';
            } else {
                classDescription.style.display = 'flex';
            }

            if (unitDropdown.childElementCount === 0) {
                units.sort((a, b) => a.name.localeCompare(b.name));
                units.forEach(unit => displayUnit(unit));

                if (units.length === 0) {
                    const unitDropdown = document.getElementById(`${clsObj.unique_string_id}-class-dropdown`);
                    const unitHolder = document.createElement('div');
                    unitHolder.classList.add('class-holder');

                    const unitName = document.createElement('li');
                    unitName.classList.add('class');
                    unitName.innerText = 'No units available!';

                    unitDropdown.appendChild(unitHolder);
                    unitHolder.appendChild(unitName);
                };
            }

            lastOpenedUnitDropdown = unitDropdown;
            lastShownDescription = classDescription;
        });

        const unitDropdown = document.createElement('ul');
        unitDropdown.classList.add('class-dropdown', 'hidden-dropdown');
        unitDropdown.id = `${clsObj.unique_string_id}-class-dropdown`;

        countAndButtonHolder.appendChild(clsUnitCount);
        countAndButtonHolder.appendChild(addUnitButton);
        classDescription.appendChild(countAndButtonHolder);
        className.appendChild(viewAllUnitsLink);
        classHolder.appendChild(className);
        classHolder.appendChild(classDescription);
        classList.appendChild(classHolder);
        classHolder.appendChild(unitDropdown);
    };

    classesSection.appendChild(classHeader);
    classesSection.appendChild(classList);
};

async function displayUnit(unit) {
    const unitDropdown = document.getElementById(`${unit.classid}-class-dropdown`);

    const existingClasses = Array.from(unitDropdown.getElementsByTagName('li'));
    const isAlreadyAdded = existingClasses.some(unitElement => unitElement.innerText === unit.name);

    if (!isAlreadyAdded) {
        const unitHolder = document.createElement('div');
        unitHolder.classList.add('class-holder');
        unitHolder.id = `${unit.unique_string_id}-class-holder`;

        const unitName = document.createElement('li');
        unitName.classList.add('class');
        unitName.id = `${unit.unique_string_id}-class`;
        unitName.innerText = unit.name;

        unitName.addEventListener('click', async (e) => {
            e.stopPropagation();

            await fetchTopics(unit.subjectid, unit.classid, unit.unique_string_id);

            const topicDropdown = document.getElementById(`${unit.unique_string_id}-unit-dropdown`);
            if (topicDropdown) {
                topicDropdown.classList.toggle('hidden-dropdown');
            };
        });

        unitDropdown.appendChild(unitHolder);
        unitHolder.appendChild(unitName);
    };
}

async function fetchTopics(subjectId, classId, unitId) {
    const res = await fetch(`/api/topics/${subjectId}/${classId}/${unitId}`);
    const topics = await res.json();

    const unitHolder = document.getElementById(`${unitId}-class-holder`);
    let topicDropdown = document.getElementById(`${unitId}-unit-dropdown`);

    if (!topicDropdown) {
        topicDropdown = document.createElement('ul');
        topicDropdown.classList.add('unit-dropdown', 'hidden-dropdown');
        topicDropdown.id = `${unitId}-unit-dropdown`;
        unitHolder.appendChild(topicDropdown);
    } else {
        topicDropdown.innerHTML = '';
    };

    if (topics.length === 0) {
        const topicItemHolder = document.createElement('li');
        topicItemHolder.classList.add('unit-item-holder');

        const topicItem = document.createElement('a');
        topicItem.classList.add('unit');
        topicItem.innerText = 'No topics available!';

        topicItemHolder.appendChild(topicItem);
        topicDropdown.appendChild(topicItemHolder);
    } else {
        topics.forEach(topic => {
            displayTopic(topic, unitId);
        })
    };
};

function displayTopic(topic, unitId) {
    const topicDropdown = document.getElementById(`${unitId}-unit-dropdown`);

    const topicItemHolder = document.createElement('li');
    topicItemHolder.classList.add('unit-item-holder');

    const topicItem = document.createElement('a');
    topicItem.href = `/${topic.subjectid}/${topic.classid}/${topic.unitid}`;
    topicItem.title = topicItem.href;
    topicItem.classList.add('unit');
    topicItem.innerText = topic.name;

    topicItemHolder.appendChild(topicItem);
    topicDropdown.appendChild(topicItemHolder);
};

function openUnitFormModal(subjectId, classId) {
    const modal = document.createElement('div');
    modal.id = 'classModal';

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modalOverlay';
    document.body.appendChild(modalOverlay);

    const form = document.createElement('form');
    form.id = 'classForm';

    const nameInput = document.createElement('input');
    nameInput.id = 'modalNameInput';
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'Unit Name';
    nameInput.required = true;
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'modalDescriptionInput'
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Unit Description';
    descriptionInput.rows = '4';
    form.appendChild(descriptionInput);

    const learningObjectivesInput = document.createElement('textarea');
    learningObjectivesInput.id = 'modalLearningObjectivesInput'
    learningObjectivesInput.name = 'learningObjectives';
    learningObjectivesInput.placeholder = 'Learning Objectives';
    learningObjectivesInput.rows = '4';
    form.appendChild(learningObjectivesInput);

    const unitOutcomesInput = document.createElement('textarea');
    unitOutcomesInput.id = 'modalUnitOutcomesInput'
    unitOutcomesInput.name = 'unitOutcomes';
    unitOutcomesInput.placeholder = 'Unit Outcomes';
    unitOutcomesInput.rows = '4';
    form.appendChild(unitOutcomesInput);

    const prerequisitesInput = document.createElement('textarea');
    prerequisitesInput.id = 'modalPrerequisitesInput'
    prerequisitesInput.name = 'prerequisites';
    prerequisitesInput.placeholder = 'Prerequisites';
    prerequisitesInput.rows = '4';
    form.appendChild(prerequisitesInput);

    const submitButton = document.createElement('button');
    submitButton.id = 'modalSubmitButton'
    submitButton.type = 'submit';
    submitButton.innerText = 'Add Unit';
    form.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.id = 'modalCloseButton'
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.removeChild(modal);
        document.body.removeChild(modalOverlay);
    });
    form.appendChild(closeButton);

    modal.appendChild(form);
    document.body.appendChild(modal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: nameInput.value,
            description: descriptionInput.value,
            learningObjectives: learningObjectivesInput.value.split('\n').map(item => item.trim()).filter(Boolean),
            unitOutcomes: unitOutcomesInput.value,
            prerequisites: prerequisitesInput.value
        };

        console.log(formData);
        console.log(JSON.stringify(formData));

        try {
            const res = await fetch(`/api/units/${subjectId}/${classId}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const result = await res.json();
                alert('Unit added successfully!');
            } else {
                alert('Error adding unit');
            }

            document.body.removeChild(modal);
            document.body.removeChild(modalOverlay);
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding unit');
        }
    });
};
