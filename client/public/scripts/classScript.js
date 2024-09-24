const subjectId = window.location.pathname.split('/')[1];
const classId = window.location.pathname.split('/')[2];

async function fetchSubject() {
    const res = await fetch(`/api/subjects/${subjectId}`);
    const subject = await res.json();
    document.title = `${subject.name} | StudyGo`;
    fetchClasses(subjectId);
}

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
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
    const res = await fetch(`/api/classes/${subjectId}/${classId}`);
    const data = await res.json();
    console.log(data);
    data.unitIds.forEach(unit => {
        // unit is the unit ids. now use the unit ids to fetch the unit details
        
        fetchUnit(unit);
        
        // const unitItem = document.createElement('li');
        // unitItem.innerText = unit;
        // document.body.appendChild(unitItem);
    });
}

async function fetchUnit(unitId) {
    const res = await fetch(`/api/classes/${subjectId}/${classId}/${unitId}`);
    const unit = await res.json();
    console.log(unit);
    displayUnit(unit);
}

function displayUnit(unit) {
    const unitHolder = document.createElement('ul');
    const unitItem = document.createElement('li');
    unitItem.classList.add('unit');
    unitItem.innerText = unit.name;
    unitHolder.appendChild(unitItem);
    document.body.appendChild(unitHolder);
}

fetchSubject();