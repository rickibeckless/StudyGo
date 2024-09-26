async function fetchSubjects() {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    subjects.sort((a, b) => a.name.localeCompare(b.name));
    subjects.forEach(subject => displaySubject(subject));
};

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();

    classes.sort((a, b) => a.name.localeCompare(b.name));
    classes.forEach(classes => displayClass(classes));

    if (classes.length === 0) {
        const classDropdown = document.getElementById(`${subjectId}-class-dropdown`);
        const classHolder = document.createElement('div');
        classHolder.classList.add('class-holder');

        const className = document.createElement('li');
        className.classList.add('class');
        className.innerText = 'No classes available!';

        classDropdown.appendChild(classHolder);
        classHolder.appendChild(className);
    };
};

let lastOpenedClassDropdown = null;
let lastShownDescription = null;

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
    viewAllClassesLink.classList.add('view-all-classes-link');
    viewAllClassesLink.innerText = `(all ${subject.name} classes \u2192)`;

    const subDescription = document.createElement('p');
    subDescription.classList.add('subject-description');
    subDescription.innerText = subject.description;

    const subClassCountNum = subject.classIds.filter(classId => classId !== '');

    const subClassCount = document.createElement('p');
    subClassCount.classList.add('subject-class-count');
    subClassCount.innerHTML = `<span class="subject-class-count-number">${subClassCountNum.length}</span> classes`;

    subHolder.addEventListener('click', () => {
        const classDropdown = document.getElementById(`${subject.id}-class-dropdown`);

        if (lastOpenedClassDropdown && lastOpenedClassDropdown !== classDropdown) {
            lastOpenedClassDropdown.classList.add('hidden-dropdown');
        }

        if (lastShownDescription && lastShownDescription !== subDescription) {
            lastShownDescription.style.display = 'block';
        }

        classDropdown.classList.toggle('hidden-dropdown');

        if (!classDropdown.classList.contains('hidden-dropdown')) {
            subDescription.style.display = 'none';
        } else {
            subDescription.style.display = 'block';
        }

        if (classDropdown.childElementCount === 0) {
            fetchClasses(subject.id);
        }

        lastOpenedClassDropdown = classDropdown;
        lastShownDescription = subDescription;
    });

    const classDropdown = document.createElement('ul');
    classDropdown.classList.add('class-dropdown', 'hidden-dropdown'); 
    classDropdown.id = `${subject.id}-class-dropdown`;

    subDescription.appendChild(subClassCount);
    subName.appendChild(viewAllClassesLink);
    subHolder.appendChild(subName);
    subHolder.appendChild(subDescription);
    subList.appendChild(subHolder);
    subHolder.appendChild(classDropdown);
    defaultLi.style.display = 'none';
};

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

        className.addEventListener('click', async (e) => {
            e.stopPropagation();

            await fetchUnits(classes.subjectId, classes.id);
        
            const unitDropdown = document.getElementById(`${classes.id}-unit-dropdown`);
            if (unitDropdown) {
                unitDropdown.classList.toggle('hidden-dropdown');
            };
        });

        classDropdown.appendChild(classHolder);
        classHolder.appendChild(className);
    };
};

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
    };

    const unitFetchPromises = data.unitIds.map(unit => fetchUnit(unit, subjectId, classId));
    await Promise.all(unitFetchPromises);

    if (data.unitIds.length === 0) {
        const unitItemHolder = document.createElement('li');
        unitItemHolder.classList.add('unit-item-holder');

        const unitItem = document.createElement('p');
        unitItem.classList.add('unit');
        unitItem.innerText = 'No units available!';

        unitItemHolder.appendChild(unitItem);
        unitDropdown.appendChild(unitItemHolder);
    };
};

async function fetchUnit(unitId, subjectId, classId) {
    const res = await fetch(`/api/classes/${subjectId}/${classId}/${unitId}`);
    const unit = await res.json();
    displayUnit(unit, classId);
};

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
};

function navigateToClass(subjectId, classId) {
    window.location.href = `/${subjectId}/${classId}`;
};

fetchSubjects();