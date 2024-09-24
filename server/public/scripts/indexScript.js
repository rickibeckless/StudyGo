async function fetchSubjects() {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();
    subjects.forEach(subject => displaySubject(subject));
};

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/subject/${subjectId}`);
    const classes = await res.json();
    classes.forEach(classes => displayClass(classes));
};

let lastOpenedClassHolder = null;

function displaySubject(subject) {
    const defaultLi = document.getElementById('default-li');
    const subList = document.getElementById('subject-list');

    const subHolder = document.createElement('div');
    subHolder.classList.add('subject-holder');
    subHolder.id = subject.id;

    const subName = document.createElement('li');
    subName.classList.add('subject');
    subName.innerText = subject.name;

    subName.addEventListener('click', () => {
        const classHolder = document.getElementById(`${subject.id}-class-holder`);

        if (lastOpenedClassHolder && lastOpenedClassHolder !== classHolder) {
            lastOpenedClassHolder.classList.add('hidden-dropdown');
        };

        classHolder.classList.toggle('hidden-dropdown');

        if (classHolder.childElementCount === 0) {
            fetchClasses(subject.id);
        };

        lastOpenedClassHolder = classHolder;
    });

    const classHolder = document.createElement('ul');
    classHolder.classList.add('class-holder', 'hidden-dropdown'); 
    classHolder.id = `${subject.id}-class-holder`;

    subHolder.appendChild(subName);
    subList.appendChild(subHolder);
    subHolder.appendChild(classHolder);
    defaultLi.style.display = 'none';
};

function hideAllClassHolders() {
    const allClassHolders = document.querySelectorAll('.class-holder');
    allClassHolders.forEach(classHolder => {
        classHolder.classList.add('hidden-dropdown'); 
    });
};

function displayClass(classes) {
    const classHolder = document.getElementById(`${classes.subjectId}-class-holder`);

    const existingClasses = Array.from(classHolder.getElementsByTagName('li'));
    const isAlreadyAdded = existingClasses.some(classElement => classElement.innerText === classes.name);

    if (!isAlreadyAdded) {
        const classNameHolder = document.createElement('li');
        classNameHolder.classList.add('class-name-holder');

        const className = document.createElement('a');
        className.classList.add('class');
        className.href = `${classes.subjectId}/${classes.id}`;
        className.title = className.href;
        className.innerText = classes.name;

        // className.addEventListener('click', () => {
        //     navigateToClass(classes.subjectId, classes.id);
        // });

        classNameHolder.appendChild(className);
        classHolder.appendChild(classNameHolder);
    }
};

// function navigateToClass(subjectId, classId) {
//     window.location.href = `/classes/subject/${subjectId}/${classId}`;
// }

fetchSubjects();