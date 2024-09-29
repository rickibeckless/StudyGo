async function fetchSubjects() {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    document.title = 'All Subjects | StudyGo';

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
let lastSubHolder = null; 

async function displaySubject(subject) {
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
    viewAllClassesLink.classList.add('view-all-classes-link');
    viewAllClassesLink.innerText = `(all ${subject.name} classes \u2192)`;

    const subDescription = document.createElement('p');
    subDescription.classList.add('subject-description');
    subDescription.innerText = subject.description;

    const res = await fetch(`/api/classes/${subject.unique_string_id}`);
    const classes = await res.json();

    const filteredClasses = classes.filter(clsObj => clsObj.subjectid === subject.unique_string_id);

    const subClassCountNum = filteredClasses.length;

    const countAndButtonHolder = document.createElement('div');
    countAndButtonHolder.classList.add('count-and-button-holder');

    const subClassCount = document.createElement('p');
    subClassCount.classList.add('subject-class-count');

    if (subClassCountNum === 1) {
        subClassCount.innerHTML = `<span class="subject-class-count-number">${subClassCountNum}</span> class`;
    } else {
        subClassCount.innerHTML = `<span class="subject-class-count-number">${subClassCountNum}</span> classes`;
    };

    const addClassButton = document.createElement('button');
    addClassButton.classList.add('add-class-button');
    addClassButton.title = 'Add a class';
    addClassButton.innerText = '+';

    addClassButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        openClassFormModal(subject.unique_string_id);
    });

    subHolder.addEventListener('click', () => {
        const classDropdown = document.getElementById(`${subject.unique_string_id}-class-dropdown`);

        if (lastOpenedClassDropdown && lastOpenedClassDropdown !== classDropdown) {
            lastOpenedClassDropdown.classList.add('hidden-dropdown');
            //lastSubHolder.style.justifyContent = 'space-between';
        }

        if (lastShownDescription && lastShownDescription !== subDescription) {
            lastShownDescription.style.display = 'flex';
            //lastSubHolder.style.justifyContent = 'space-between';
        }

        classDropdown.classList.toggle('hidden-dropdown');

        if (!classDropdown.classList.contains('hidden-dropdown')) {
            subDescription.style.display = 'none';
            //subHolder.style.justifyContent = 'normal'
        } else {
            subDescription.style.display = 'flex';
            //subHolder.style.justifyContent = 'space-between';
        }

        if (classDropdown.childElementCount === 0) {
            fetchClasses(subject.unique_string_id);
        }

        lastOpenedClassDropdown = classDropdown;
        lastShownDescription = subDescription;
        lastSubHolder = subHolder;
    });

    const classDropdown = document.createElement('ul');
    classDropdown.classList.add('class-dropdown', 'hidden-dropdown'); 
    classDropdown.id = `${subject.unique_string_id}-class-dropdown`;

    countAndButtonHolder.appendChild(subClassCount);
    countAndButtonHolder.appendChild(addClassButton);
    subDescription.appendChild(countAndButtonHolder);
    subName.appendChild(viewAllClassesLink);
    subHolder.appendChild(subName);
    subHolder.appendChild(subDescription);
    subList.appendChild(subHolder);
    subHolder.appendChild(classDropdown);
    defaultLi.style.display = 'none';
};

function displayClass(classes) {
    // i want to create an 'add class' button here
    // i want it to be a button that when clicked, will open a popup modal
    const classDropdown = document.getElementById(`${classes.subjectid}-class-dropdown`);

    const existingClasses = Array.from(classDropdown.getElementsByTagName('li'));
    const isAlreadyAdded = existingClasses.some(classElement => classElement.innerText === classes.name);

    if (!isAlreadyAdded) {
        const classHolder = document.createElement('div');
        classHolder.classList.add('class-holder');
        classHolder.id = `${classes.unique_string_id}-class-holder`;

        const className = document.createElement('li');
        className.classList.add('class');
        className.id = `${classes.unique_string_id}-class`;
        className.innerText = classes.name;

        className.addEventListener('click', async (e) => {
            e.stopPropagation();

            await fetchUnits(classes.subjectid, classes.unique_string_id);
        
            const unitDropdown = document.getElementById(`${classes.unique_string_id}-unit-dropdown`);
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

    if (data.length === 0) {
        const unitItemHolder = document.createElement('li');
        unitItemHolder.classList.add('unit-item-holder');

        const unitItem = document.createElement('p');
        unitItem.classList.add('unit');
        unitItem.innerText = 'No units available!';

        unitItemHolder.appendChild(unitItem);
        unitDropdown.appendChild(unitItemHolder);
    } else {
        data.forEach(unit => {
            displayUnit(unit, classId);
        })
    };
};

// unused function
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
    unitItem.href = `/${unit.subjectid}/${classId}/${unit.unique_string_id}`;
    unitItem.title = unitItem.href;
    unitItem.classList.add('unit');
    unitItem.innerText = unit.name;

    unitItemHolder.appendChild(unitItem);
    unitDropdown.appendChild(unitItemHolder);
};

function navigateToClass(subjectId, classId) {
    window.location.href = `/${subjectId}/${classId}`;
};

function openClassFormModal(subjectId) {
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
    nameInput.placeholder = 'Class Name';
    nameInput.required = true;
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'modalDescriptionInput'
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Class Description';
    descriptionInput.rows = '4';
    form.appendChild(descriptionInput);

    const submitButton = document.createElement('button');
    submitButton.id = 'modalSubmitButton'
    submitButton.type = 'submit';
    submitButton.innerText = 'Add Class';
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
        };

        console.log(formData);
        console.log(JSON.stringify(formData));

        try {
            const res = await fetch(`/api/classes/${subjectId}/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const result = await res.json();
                alert('Class added successfully!');
            } else {
                alert('Error adding class');
            }

            document.body.removeChild(modal);
            document.body.removeChild(modalOverlay);
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding class');
        }
    });
};

fetchSubjects();