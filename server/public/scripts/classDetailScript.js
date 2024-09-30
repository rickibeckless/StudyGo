document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const subjectId = pathSegments[0];
    const classId = pathSegments[1];

    displayClassPage(subjectId, classId);
});

async function displayClassPage(subjectId, classId) {
    const classRes = await fetch(`/api/classes/${subjectId}`);
    const classes = await classRes.json();

    const currentClass = classes.find(cls => cls.unique_string_id === classId);
    document.title = `${currentClass.name} | StudyGo`;

    const mainBody = document.getElementById('main-body');
    const classSection = document.createElement('section');
    classSection.id = 'class-section';

    const classHeader = document.createElement('div');
    classHeader.id = 'class-header';

    const classTitle = document.createElement('h2');
    classTitle.innerText = `${currentClass.name}`;

    const classStatsHolder = document.createElement('div');
    classStatsHolder.id = 'class-stats-holder';

    const convertDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
    };

    const classCreatedDate = document.createElement('p');
    classCreatedDate.id = 'class-created-date';
    classCreatedDate.innerHTML = `Created: <span>${convertDate(currentClass.date_created)}</span>`;

    const classUpdatedDate = document.createElement('p');
    classUpdatedDate.id = 'class-updated-date';
    classUpdatedDate.innerHTML = `Updated: <span>${convertDate(currentClass.date_updated)}</span>`;

    const classDescription = document.createElement('p');
    classDescription.id = 'class-description';
    classDescription.innerText = `${currentClass.description}`;

    displayUnits(subjectId, classId, currentClass);

    classHeader.appendChild(classTitle);
    classHeader.appendChild(classStatsHolder);
    classHeader.appendChild(classDescription);
    classStatsHolder.appendChild(classCreatedDate);
    classStatsHolder.appendChild(classUpdatedDate);
    classSection.appendChild(classHeader);
    mainBody.appendChild(classSection);
};

async function displayUnits(subjectId, classId, currentClass) {
    const unitRes = await fetch(`/api/classes/${subjectId}/${classId}`);
    const units = await unitRes.json();

    const mainBody = document.getElementById('main-body');
    const classSection = document.getElementById('class-section');

    const unitSection = document.createElement('section');
    unitSection.id = 'unit-section';

    const unitList = document.createElement('ul');
    unitList.id = 'unit-list';

    units.forEach(unit => {
        const unitHolder = document.createElement('div');
        unitHolder.id = `${unit.unique_string_id}-unit-holder`;
        unitHolder.classList.add('unit-holder');

        const unitName = document.createElement('a');
        unitName.href = `/${unit.subjectid}/${unit.classid}/${unit.unique_string_id}`;
        unitName.classList.add('unit-name');
        unitName.innerText = unit.name;

        const unitDescription = document.createElement('p');
        unitDescription.classList.add('unit-description');
        unitDescription.innerText = unit.description;

        unitHolder.appendChild(unitName);
        unitHolder.appendChild(unitDescription);
        unitList.appendChild(unitHolder);

        displayTopics(subjectId, classId, unit);
    });

    unitSection.appendChild(unitList);
    classSection.appendChild(unitSection);
};

async function displayTopics(subjectId, classId, unit) {
    const topicRes = await fetch(`/api/classes/${subjectId}/${classId}/${unit.unique_string_id}`);
    const topics = await topicRes.json();

    const unitHolder = document.getElementById(`${unit.unique_string_id}-unit-holder`);
    const topicList = document.createElement('ul');
    topicList.classList.add('topic-list');

    topics.forEach(topic => {
        const topicHolder = document.createElement('div');
        topicHolder.id = `${topic.unique_string_id}-topic-holder`;
        topicHolder.classList.add('topic-holder');

        const topicName = document.createElement('li');
        topicName.classList.add('topic-name');
        topicName.innerText = topic.name;

        const addLessonButton = document.createElement('button');
        addLessonButton.classList.add('add-lesson-button');
        addLessonButton.title = 'Add Lesson';
        addLessonButton.innerText = 'Add Lesson';

        addLessonButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            openLessonFormModal(subjectId, classId, unit, topic);
        });

        const topicDescription = document.createElement('p');
        topicDescription.classList.add('topic-description');
        topicDescription.innerText = topic.description;

        topicName.appendChild(addLessonButton);
        topicHolder.appendChild(topicName);
        topicHolder.appendChild(topicDescription);
        topicList.appendChild(topicHolder);

        displaySubTopics(subjectId, classId, unit, topic, topicHolder);
    });

    unitHolder.appendChild(topicList);
};

async function displaySubTopics(subjectId, classId, unit, topic, topicHolder) {
    const subTopics = [topic.lessons, topic.notes, topic.terms_defs].flat();

    const subTopicList = document.createElement('ul');
    subTopicList.classList.add('sub-topic-list');

    topic.lessons.forEach(lesson => {
        const lessonHolder = document.createElement('div');
        lessonHolder.id = `${topic.unique_string_id}-lesson-holder`;
        lessonHolder.classList.add('lesson-holder');

        const lessonName = document.createElement('li');
        lessonName.classList.add('lesson-name');
        lessonName.innerText = `Lesson: ${lesson.name}`;

        const deleteLessonButton = document.createElement('button');
        deleteLessonButton.classList.add('delete-lesson-button');
        deleteLessonButton.title = 'Delete Lesson';
        deleteLessonButton.innerText = 'Delete Lesson';

        deleteLessonButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            openDeleteLessonModal(subjectId, classId, unit, topic, lesson);
        });

        lessonName.appendChild(deleteLessonButton);

        const lessonDescription = document.createElement('p');
        lessonDescription.classList.add('lesson-description');
        lessonDescription.innerText = lesson.description;

        lessonHolder.appendChild(lessonName);
        lessonHolder.appendChild(lessonDescription);
        subTopicList.appendChild(lessonHolder);
    });

    const topicNotesNumber = topic.notes.length;
    const topicTermsDefsNumber = topic.terms_defs.length;

    subTopics.forEach(subTopic => {
        //console.log('subTopic', subTopic);
    });

    topicHolder.appendChild(subTopicList);
};

function openLessonFormModal(subjectId, classId, unit, topic) {
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
    nameInput.placeholder = 'Lesson Name';
    nameInput.required = true;
    form.appendChild(nameInput);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'modalDescriptionInput';
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Lesson Description';
    descriptionInput.rows = '4';
    form.appendChild(descriptionInput);

    const lessonContentContainer = document.createElement('div');
    lessonContentContainer.id = 'editor';
    lessonContentContainer.style.height = '200px';
    form.appendChild(lessonContentContainer);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];

    const quill = new Quill(lessonContentContainer, {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    const submitButton = document.createElement('button');
    submitButton.id = 'modalSubmitButton';
    submitButton.type = 'submit';
    submitButton.innerText = 'Add Lesson';
    form.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.id = 'modalCloseButton';
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

        const lesson = {
            name: nameInput.value,
            description: descriptionInput.value,
            lesson_content: quill.root.innerHTML,
        };

        try {
            const res = await fetch(`/api/topics/${subjectId}/${classId}/${unit.unique_string_id}/${topic.unique_string_id}/new-sub-topic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lesson }),
            });

            if (res.ok) {
                const result = await res.json();
                alert('Lesson added successfully!');
            } else {
                alert('Error adding lesson');
            }

            document.body.removeChild(modal);
            document.body.removeChild(modalOverlay);
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding lesson');
        }
    });
};

function openDeleteLessonModal(subjectId, classId, unit, topic, lesson) {
    const modal = document.createElement('div');
    modal.id = 'classModal';

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modalOverlay';
    document.body.appendChild(modalOverlay);

    const form = document.createElement('form');
    form.id = 'classForm';

    const lessonContentHTMLSpliced = lesson.lesson_content.slice(0, 100);

    const deleteMessage = document.createElement('p');
    deleteMessage.id = 'deleteMessage';
    deleteMessage.innerText = `Are you sure you want to delete the lesson: "${lesson.name}" with the content: "${lessonContentHTMLSpliced}..."?`;

    form.appendChild(deleteMessage);

    const submitButton = document.createElement('button');
    submitButton.id = 'modalSubmitButton';
    submitButton.type = 'submit';
    submitButton.innerText = 'Delete Lesson';
    form.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.id = 'modalCloseButton';
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

        try {
            const res = await fetch(`/api/topics/${subjectId}/${classId}/${unit.unique_string_id}/${topic.unique_string_id}/delete-lesson`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lessonId: lesson.unique_string_id }),
            });

            if (res.ok) {
                const result = await res.json();
                alert('Lesson deleted successfully!');
            } else {
                alert('Error deleting lesson');
            }

            document.body.removeChild(modal);
            document.body.removeChild(modalOverlay);
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting lesson');
        }
    });
};