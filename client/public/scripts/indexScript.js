// async function fetchSubjects() {
//     const res = await fetch('/api/subjects');
//     const subjects = await res.json();

//     subjects.sort((a, b) => b.classIds.length - a.classIds.length);
//     subjects.splice(5);
//     subjects.forEach(subject => displaySubject(subject));
// }

// async function fetchClasses(subjectId) {
//     const res = await fetch(`/api/classes/${subjectId}`);
//     const classes = await res.json();

//     classes.sort((a, b) => b.unitIds.length - a.unitIds.length);
//     classes.splice(5);
//     classes.forEach(classes => displayClass(classes));
// }

async function fetchSubjects() {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    const classesRes = await fetch(`/api/classes`);
    const classes = await classesRes.json();

    const classesSubIdsSet = new Set(classes.map(clsObj => clsObj.subjectid));

    const filteredSubjects = subjects.filter(subject => classesSubIdsSet.has(subject.unique_string_id));

    filteredSubjects.forEach(subject => displaySubject(subject));
}

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();

    classes.splice(5);
    classes.forEach(classObj => displayClass(classObj));
}

let lastOpenedClassDropdown = null;
let lastOpenedDescription = null;
let lastOpenedAllClassesLink = null;

// function displaySubject(subject) {
//     const defaultLi = document.getElementById('default-li');
//     const subList = document.getElementById('subject-list');

//     const subHolder = document.createElement('div');
//     subHolder.classList.add('subject-holder');
//     subHolder.id = subject.id;

//     const subName = document.createElement('li');
//     subName.classList.add('subject');
//     subName.innerText = subject.name;

//     const viewAllClassesLink = document.createElement('a');
//     viewAllClassesLink.href = `/${subject.id}`;
//     viewAllClassesLink.title = viewAllClassesLink.href;
//     viewAllClassesLink.classList.add('view-all-classes-link', 'hidden-class-link');
//     viewAllClassesLink.innerText = `(all ${subject.name} classes \u2192)`;

//     const subDescription = document.createElement('p');
//     subDescription.classList.add('subject-description', 'hidden-description');
//     subDescription.innerText = subject.description;

//     subName.addEventListener('click', () => {
//         const classDropdown = document.getElementById(`${subject.id}-class-dropdown`);

//         if (lastOpenedClassDropdown && lastOpenedClassDropdown !== classDropdown) {
//             lastOpenedClassDropdown.classList.add('hidden-dropdown');
//         }
//         if (lastOpenedDescription && lastOpenedDescription !== subDescription) {
//             lastOpenedDescription.classList.add('hidden-description');
//         }
//         if (lastOpenedAllClassesLink && lastOpenedAllClassesLink !== viewAllClassesLink) {
//             lastOpenedAllClassesLink.classList.add('hidden-class-link');
//         }

//         classDropdown.classList.toggle('hidden-dropdown');

//         if (classDropdown.childElementCount === 0) {
//             fetchClasses(subject.id);
//         }

//         lastOpenedClassDropdown = classDropdown;
//         lastOpenedDescription = subDescription;
//         lastOpenedAllClassesLink = viewAllClassesLink;

//         subDescription.classList.toggle('hidden-description');
//         viewAllClassesLink.classList.toggle('hidden-class-link');
//     });

//     const classDropdown = document.createElement('ul');
//     classDropdown.classList.add('class-dropdown', 'hidden-dropdown'); 
//     classDropdown.id = `${subject.id}-class-dropdown`;

//     subName.appendChild(viewAllClassesLink);
//     subHolder.appendChild(subName);
//     subHolder.appendChild(subDescription);
//     subList.appendChild(subHolder);
//     subHolder.appendChild(classDropdown);
//     defaultLi.style.display = 'none';

//     handleMainBtnClick();
// }

function displaySubject(subject) {
    const defaultLi = document.getElementById('default-li');
    const subList = document.getElementById('subject-list');

    const subHolder = document.createElement('div');
    subHolder.classList.add('subject-holder');
    subHolder.id = subject.unique_string_id;

    const subName = document.createElement('li');
    subName.classList.add('subject');
    subName.innerText = subject.name;

    const viewAllClassesLink = document.createElement('a');
    viewAllClassesLink.href = `/${subject.unique_string_id}`;
    viewAllClassesLink.title = viewAllClassesLink.href;
    viewAllClassesLink.classList.add('view-all-classes-link', 'hidden-class-link');
    viewAllClassesLink.innerText = `(all ${subject.name} classes →)`;

    const subDescription = document.createElement('p');
    subDescription.classList.add('subject-description', 'hidden-description');
    subDescription.innerText = subject.description;

    subName.addEventListener('click', () => {
        const classDropdown = document.getElementById(`${subject.unique_string_id}-class-dropdown`);

        if (lastOpenedClassDropdown && lastOpenedClassDropdown !== classDropdown) {
            lastOpenedClassDropdown.classList.add('hidden-dropdown');
        }
        if (lastOpenedDescription && lastOpenedDescription !== subDescription) {
            lastOpenedDescription.classList.add('hidden-description');
        }
        if (lastOpenedAllClassesLink && lastOpenedAllClassesLink !== viewAllClassesLink) {
            lastOpenedAllClassesLink.classList.add('hidden-class-link');
        }

        classDropdown.classList.toggle('hidden-dropdown');

        if (classDropdown.childElementCount === 0) {
            fetchClasses(subject.unique_string_id);
        }

        lastOpenedClassDropdown = classDropdown;
        lastOpenedDescription = subDescription;
        lastOpenedAllClassesLink = viewAllClassesLink;

        subDescription.classList.toggle('hidden-description');
        viewAllClassesLink.classList.toggle('hidden-class-link');
    });

    const classDropdown = document.createElement('ul');
    classDropdown.classList.add('class-dropdown', 'hidden-dropdown'); 
    classDropdown.id = `${subject.unique_string_id}-class-dropdown`;

    subName.appendChild(viewAllClassesLink);
    subHolder.appendChild(subName);
    subHolder.appendChild(subDescription);
    subList.appendChild(subHolder);
    subHolder.appendChild(classDropdown);
    defaultLi.style.display = 'none';

    handleMainBtnClick();
}

function handleMainBtnClick() {
    const mainBtn = document.getElementById('main-section-button');
    const subjectSection = document.getElementById('subjects-section');

    // used mainBtn to scroll to the top of the subjects section because of sticky header
    mainBtn.addEventListener('click', () => {
        mainBtn.scrollIntoView({ behavior: 'smooth' });
    });
}

// function displayClass(classes) {
//     const classDropdown = document.getElementById(`${classes.subjectId}-class-dropdown`);

//     const existingClasses = Array.from(classDropdown.getElementsByTagName('li'));
//     const isAlreadyAdded = existingClasses.some(classElement => classElement.innerText === classes.name);

//     if (!isAlreadyAdded) {
//         const classHolder = document.createElement('div');
//         classHolder.classList.add('class-holder');
//         classHolder.id = `${classes.id}-class-holder`;

//         const className = document.createElement('li');
//         className.classList.add('class');
//         className.id = `${classes.id}-class`;
//         className.innerText = classes.name;

//         className.addEventListener('click', async () => {
//             await fetchUnits(classes.subjectId, classes.id);
        
//             const unitDropdown = document.getElementById(`${classes.id}-unit-dropdown`);
//             if (unitDropdown) {
//                 unitDropdown.classList.toggle('hidden-dropdown');
//             }
//         });

//         classDropdown.appendChild(classHolder);
//         classHolder.appendChild(className);
//     }
// }

function displayClass(classObj) {
    const classDropdown = document.getElementById(`${classObj.subjectid}-class-dropdown`);

    const existingClasses = Array.from(classDropdown.getElementsByTagName('li'));
    const isAlreadyAdded = existingClasses.some(classElement => classElement.innerText === classObj.name);

    if (!isAlreadyAdded) {
        const classHolder = document.createElement('div');
        classHolder.classList.add('class-holder');
        classHolder.id = `${classObj.unique_string_id}-class-holder`;

        const className = document.createElement('li');
        className.classList.add('class');
        className.id = `${classObj.unique_string_id}-class`;
        className.innerText = classObj.name;

        className.addEventListener('click', async () => {
            console.log(classObj)
            await fetchUnits(classObj.subjectid, classObj.unique_string_id);
        
            const unitDropdown = document.getElementById(`${classObj.unique_string_id}-unit-dropdown`);
            if (unitDropdown) {
                unitDropdown.classList.toggle('hidden-dropdown');
            }
        });

        classDropdown.appendChild(classHolder);
        classHolder.appendChild(className);
    }
}

// async function fetchUnits(subjectId, classId) {
//     const res = await fetch(`/api/classes/${subjectId}/${classId}`);
//     const data = await res.json();

//     const classHolder = document.getElementById(`${classId}-class-holder`);
//     let unitDropdown = document.getElementById(`${classId}-unit-dropdown`);

//     if (!unitDropdown) {
//         unitDropdown = document.createElement('ul');
//         unitDropdown.classList.add('unit-dropdown', 'hidden-dropdown');
//         unitDropdown.id = `${classId}-unit-dropdown`;
//         classHolder.appendChild(unitDropdown);
//     } else {
//         unitDropdown.innerHTML = '';
//     }

//     const unitFetchPromises = data.unitIds.map(unit => fetchUnit(unit, subjectId, classId));
//     await Promise.all(unitFetchPromises);
// }

// async function fetchUnits(subjectId, classId) {

//     const res = await fetch(`/api/classes/${subjectId}/${classId}`);
//     const data = await res.json();

//     console.log(data)

//     const classHolder = document.getElementById(`${classId}-class-holder`);
//     let unitDropdown = document.getElementById(`${classId}-unit-dropdown`);

//     if (!unitDropdown) {
//         unitDropdown = document.createElement('ul');
//         unitDropdown.classList.add('unit-dropdown', 'hidden-dropdown');
//         unitDropdown.id = `${classId}-unit-dropdown`;
//         classHolder.appendChild(unitDropdown);
//     } else {
//         unitDropdown.innerHTML = '';
//     }

//     const unitFetchPromises = data.unitIds.map(unit => fetchUnit(unit, subjectId, classId));
//     await Promise.all(unitFetchPromises);
// }

// async function fetchUnit(unitId, subjectId, classId) {
//     const res = await fetch(`/api/classes/${subjectId}/${classId}/${unitId}`);
//     const unit = await res.json();
//     displayUnit(unit, classId);
// }

// function displayUnit(unit, classId) {
//     const unitDropdown = document.getElementById(`${classId}-unit-dropdown`);

//     const unitItemHolder = document.createElement('li');
//     unitItemHolder.classList.add('unit-item-holder');

//     const unitItem = document.createElement('a');
//     unitItem.href = `/${unit.subjectId}/${classId}/${unit.id}`;
//     unitItem.title = unitItem.href;
//     unitItem.classList.add('unit');
//     unitItem.innerText = unit.name;

//     unitItemHolder.appendChild(unitItem);
//     unitDropdown.appendChild(unitItemHolder);
// }

async function fetchUnits(subjectId, classId) {
    const res = await fetch(`/api/classes/${subjectId}/${classId}`);
    const units = await res.json();

    console.log(units);

    const classHolder = document.getElementById(`${classId}-class-holder`);
    let unitDropdown = document.getElementById(`${classId}-unit-dropdown`);

    if (!unitDropdown) {
        unitDropdown = document.createElement('ul');
        unitDropdown.classList.add('unit-dropdown', 'hidden-dropdown');
        unitDropdown.id = `${classId}-unit-dropdown`;
        classHolder.appendChild(unitDropdown);
    } else {
        unitDropdown.innerHTML = '';
    }

    if (units.length === 0) {
        const noUnitsItem = document.createElement('li');
        noUnitsItem.innerText = 'No units available!';
        unitDropdown.appendChild(noUnitsItem);
    } else {
        units.forEach(unit => {
            displayUnit(unit, classId);
        });
    }
}

// unused function
async function fetchUnit(unitId, subjectId, classId) {
    const res = await fetch(`/api/classes/${subjectId}/${classId}/${unitId}`);
    const unit = await res.json();
    displayUnit(unit, classId);
}

function displayUnit(unit, classId) {
    const unitDropdown = document.getElementById(`${classId}-unit-dropdown`);

    const unitItemHolder = document.createElement('li');
    unitItemHolder.classList.add('unit-item-holder');

    const unitItem = document.createElement('a');
    unitItem.href = `/${unit.subjectid}/${classId}/${unit.unique_string_id}`;
    unitItem.title = unitItem.href;
    unitItem.classList.add('unit');
    unitItem.innerText = unit.name;

    unitItemHolder.appendChild(unitItem);
    unitDropdown.appendChild(unitItemHolder);
}

function navigateToClass(subjectId, classId) {
    window.location.href = `/${subjectId}/${classId}`;
}

fetchSubjects();