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
    console.log(subject);
    //document.title = `${subject.name} | StudyGo`;
}

async function fetchClasses(subjectId) {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();
    console.log(classes);
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
    } else if (pathSegments.length === 2) {
        subjectId = pathSegments[0];
        classId = pathSegments[1];
        displayClassPage(subjectId, classId);
    }

    if (subjectId !== null) {
        fetchSubject(subjectId);
    }
    if (classId !== null) {
        fetchClasses(subjectId);
    }
});

function displayGeneralClassesPage() {
    console.log('Displaying all classes');
    /**
     * Will display all classes for all subjects.
     * Each class will have a preview of the class information.
     * Each class will have a button to view all units, which takes you to the class page (displayClassPage).
     */
}

function displaySubjectPage(subjectId) {
    console.log(`Displaying subject page for subject ID: ${subjectId}`);
    /**
     * Will display all classes for the subject.
     * Will have all subject information.
     * Each class will have almost all of the class information.
     * Only the top 5 units of a class will be displayed.
     * Will have a button to view all units, which takes you to the class page (displayClassPage).
     */

    //fetchClasses(subjectId);
}

function displayClassPage(subjectId, classId) {
    console.log(`Displaying class page for subject ID: ${subjectId}, class ID: ${classId}`);
    /**
     * Will display all units for the class.
     * Will have all class information.
     * Each unit will have all of the unit information 
     * selecting a unit will open a dropdown with the topic and subtopic information (names)
     * Selecting a topic will bring you to the units page with that topic selected.
     * There could also be a button that says "Start Course" which will take you to the first unit overview.
     */
    
    //fetchUnits(subjectId, classId);
}
