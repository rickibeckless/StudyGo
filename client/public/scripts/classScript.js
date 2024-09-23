const subjectId = window.location.pathname.split('/')[1];
const classId = window.location.pathname.split('/')[2];

async function fetchSubject() {
    const res = await fetch(`http://localhost:8080/api/subjects/${subjectId}`);
    const subject = await res.json();
    document.title = `${subject.name} | StudyGo`;
    fetchClasses(subjectId);
}

async function fetchClasses(subjectId) {
    const res = await fetch(`http://localhost:8080/api/classes/${subjectId}`);
    const classes = await res.json();
    displayClass(classes.find(cls => cls.id === classId));
}

function displayClass(classDetail) {
    const classHolder = document.createElement('ul');
    const classItem = document.createElement('li');
    classItem.classList.add('class');
    classItem.innerText = classDetail.name;
    classHolder.appendChild(classItem);
    
    fetchUnits(classDetail.id);
    document.body.appendChild(classHolder);
}

async function fetchUnits(classId) {
    const res = await fetch(`http://localhost:8080/api/classes/${subjectId}/${classId}`);
    const data = await res.json();
    data.units.forEach(unit => {
        const unitItem = document.createElement('li');
        unitItem.innerText = unit.name;
        document.body.appendChild(unitItem);
    });
}

fetchSubject();
