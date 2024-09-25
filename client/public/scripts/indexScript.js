async function fetchSubjects() {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    subjects.sort((a, b) => b.classIds.length - a.classIds.length);
    subjects.splice(5);
    subjects.forEach(subject => displaySubject(subject));
}

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();
    classes.forEach(classes => displayClass(classes));
}

let lastOpenedClassDropdown = null;

function displaySubject(subject) {
    const defaultLi = document.getElementById('default-li');
    const subList = document.getElementById('subject-list');

    const subHolder = document.createElement('div');
    subHolder.classList.add('subject-holder');
    subHolder.id = subject.id;

    const subName = document.createElement('li');
    subName.classList.add('subject');
    subName.innerText = subject.name;

    const viewAllClassesLink = document.createElement('a');
    viewAllClassesLink.href = `/${subject.id}`;
    viewAllClassesLink.title = viewAllClassesLink.href;
    viewAllClassesLink.classList.add('view-all-classes-link', 'hidden-class-link');
    viewAllClassesLink.innerText = `(all ${subject.name} classes \u2192)`;

    const subDescription = document.createElement('p');
    subDescription.classList.add('subject-description', 'hidden-description');
    subDescription.innerText = subject.description;

    subName.addEventListener('click', () => {
        const classDropdown = document.getElementById(`${subject.id}-class-dropdown`);

        if (lastOpenedClassDropdown && lastOpenedClassDropdown !== classDropdown) {
            lastOpenedClassDropdown.classList.add('hidden-dropdown');
        }

        classDropdown.classList.toggle('hidden-dropdown');

        if (classDropdown.childElementCount === 0) {
            fetchClasses(subject.id);
        }

        lastOpenedClassDropdown = classDropdown;

        subDescription.classList.remove('hidden-description');
        viewAllClassesLink.classList.remove('hidden-class-link');
    });

    const classDropdown = document.createElement('ul');
    classDropdown.classList.add('class-dropdown', 'hidden-dropdown'); 
    classDropdown.id = `${subject.id}-class-dropdown`;

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

function hideAllClassDropdowns() {
    const allClassDropdowns = document.querySelectorAll('.class-dropdown');
    allClassDropdowns.forEach(classDropdown => {
        classDropdown.classList.add('hidden-dropdown'); 
    });
}

function displayClass(classes) {
    const classDropdown = document.getElementById(`${classes.subjectId}-class-dropdown`);

    const existingClasses = Array.from(classDropdown.getElementsByTagName('li'));
    const isAlreadyAdded = existingClasses.some(classElement => classElement.innerText === classes.name);

    if (!isAlreadyAdded) {
        const classHolder = document.createElement('div');
        classHolder.classList.add('class-holder');
        classHolder.id = `${classes.id}-class-holder`;

        const className = document.createElement('li');
        className.classList.add('class');
        className.id = `${classes.id}-class`;
        className.innerText = classes.name;

        className.addEventListener('click', async () => {
            await fetchUnits(classes.subjectId, classes.id);
        
            const unitDropdown = document.getElementById(`${classes.id}-unit-dropdown`);
            if (unitDropdown) {
                unitDropdown.classList.remove('hidden-dropdown');
            }
        });

        classDropdown.appendChild(classHolder);
        classHolder.appendChild(className);
    }
}

async function fetchUnits(subjectId, classId) {
    const res = await fetch(`/api/classes/${subjectId}/${classId}`);
    const data = await res.json();

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

    const unitFetchPromises = data.unitIds.map(unit => fetchUnit(unit, subjectId, classId));
    await Promise.all(unitFetchPromises);
}

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
    unitItem.href = `/${unit.subjectId}/${classId}/${unit.id}`;
    unitItem.title = unitItem.href;
    unitItem.classList.add('unit');
    unitItem.innerText = unit.name;

    unitItemHolder.appendChild(unitItem);
    unitDropdown.appendChild(unitItemHolder);
}

function hideAllUnitDropdowns() {
    const allUnitDropdowns = document.querySelectorAll('.unit-dropdown');
    allUnitDropdowns.forEach(unitDropdown => {
        unitDropdown.classList.add('hidden-dropdown');
    });
}

function navigateToClass(subjectId, classId) {
    window.location.href = `/${subjectId}/${classId}`;
}

fetchSubjects();