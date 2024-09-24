const subjectId = window.location.pathname.split('/')[1];
const classId = window.location.pathname.split('/')[2];
const unitId = window.location.pathname.split('/')[3];

console.log(`subjectId, classId, unitId: ${subjectId}, ${classId}, ${unitId}`);

async function fetchSubject() {
    const res = await fetch(`/api/subjects/${subjectId}`);
    const subject = await res.json();
    fetchClasses();
    displaySubjectName(subject.name);
}

async function fetchClasses() {
    const res = await fetch(`/api/classes/${subjectId}`);
    const classes = await res.json();
    fetchUnit();
    displayClassName(classes.find(cls => cls.id === classId).name);
}

async function fetchUnit() {
    const res = await fetch(`/api/units/${subjectId}/${classId}/${unitId}`);
    const unit = await res.json();
    document.title = `${unit.name} | StudyGo`;
    displayUnit(unit);
    fetchTopics();
}

async function fetchTopics() {
    const res = await fetch(`/api/topics/${subjectId}/${classId}/${unitId}`);
    const topics = await res.json();
    console.log(topics);
    displayTopics(topics);
}

function displaySubjectName(subjectName) {
    const subjectLink = document.getElementById('subject-link');
    subjectLink.innerText = subjectName;
}

function displayClassName(className) {
    const classLink = document.getElementById('class-link');
    classLink.innerText = className;
}

function displayUnit(unit) {
    const defaultUnitLink = document.getElementById('unit-link');
    const unitLink = document.createElement('h3');
    unitLink.innerText = unit.name;
    defaultUnitLink.parentNode.replaceChild(unitLink, defaultUnitLink);
}

function displayTopics(topics) {
    const topicList = document.getElementById('left-nav-topics-list');
    topics.forEach(topic => {
        const topicItemHolder = document.createElement('div');
        topicItemHolder.classList.add('topic-item-holder');
        topicItemHolder.id = `${topic.id}-topic-item-holder`;

        const topicItem = document.createElement('li');
        topicItem.classList.add('topic-item');
        topicItem.innerText = topic.name;

        topicList.appendChild(topicItemHolder);
        topicItemHolder.appendChild(topicItem);

        const topicDropdown = document.createElement('ul');
        topicDropdown.classList.add('topic-dropdown', 'hidden-dropdown');
        topicDropdown.id = `${topic.id}-topic-dropdown`;
        topicItemHolder.appendChild(topicDropdown);
        
        const topicNotes = topic.notes;
        const topicTermdefs = topic.termdefs;

        console.log("topicNotes: ", topicNotes);
        console.log("topicTermdefs: ", topicTermdefs);

        const subTopicTotalIndex = document.createElement('span');
        subTopicTotalIndex.innerText = topicNotes.length + topicTermdefs.length;
        subTopicTotalIndex.classList.add('sub-topic-total-index');
        console.log(topic.name, "subTopicTotalIndex: ", subTopicTotalIndex);

        topicItem.appendChild(subTopicTotalIndex);

        //const selectedIndex = document.createElement('span');
        //selectedIndex.innerText = '0';

        //const subTopics = [topic.notes, topic.termdefs];

        // subTopics.forEach(subTopic => {
        //     subTopic.forEach(subTopicItem => {
        //         const subTopicItemHolder = document.createElement('li');
        //         subTopicItemHolder.classList.add('sub-topic-item');
        //         subTopicItemHolder.innerText = subTopicItem;
        //         topicDropdown.appendChild(subTopicItemHolder);
        //     });
        // });

        const notesHolder = document.createElement('li');
        notesHolder.id = `${topic.id}-notes`;
        notesHolder.classList.add('sub-topic-item');
        notesHolder.innerText = 'Notes';
        topicDropdown.appendChild(notesHolder);

        const termdefsHolder = document.createElement('li');
        termdefsHolder.id = `${topic.id}-termdefs`;
        termdefsHolder.classList.add('sub-topic-item');
        termdefsHolder.innerText = 'Term/Definitions';
        topicDropdown.appendChild(termdefsHolder);

        notesHolder.addEventListener('click', () => {
            localStorage.setItem('currentTopic', topic.name);
            localStorage.setItem('currentSubTopicType', 'notes');
            localStorage.setItem('currentSubTopic-topicId', topic.id);
            //selectedIndex.innerText = subTopics[0].length;
            displayRightNavContent();
            displayRightContent(topicNotes);
        });

        termdefsHolder.addEventListener('click', () => {
            localStorage.setItem('currentTopic', topic.name);
            localStorage.setItem('currentSubTopicType', 'termdefs');
            localStorage.setItem('currentSubTopic-topicId', topic.id);
            //selectedIndex.innerText = subTopics[1].length;
            displayRightNavContent();
            displayRightContent(topicTermdefs);
        });

        topicItem.addEventListener('click', () => {
            toggleTopicDropdown(topic);
        });
    });
};

function toggleTopicDropdown(topic) {
    console.log("clicked: ", topic);
    const topicDropdown = document.getElementById(`${topic.id}-topic-dropdown`);
    if (topicDropdown) {
        topicDropdown.classList.toggle('hidden-dropdown');
    };
};

function displayRightNavContent() {
    const rightNav = document.getElementById('right-nav');
    const customRightNavBorder = document.createElement('div');
    customRightNavBorder.id = 'custom-right-nav-border';

    const rightNavList = document.getElementById('right-nav-list');
    const currentTopic = localStorage.getItem('currentTopic');
    const currentSubTopicType = localStorage.getItem('currentSubTopicType');
    const currentSubTopicId = localStorage.getItem('currentSubTopic-topicId');
    const currentSubTopic = currentSubTopicType === 'notes' ? 'Notes' : 'Term/Definitions';
    console.log("currentSubTopic: ", currentSubTopic);
    if (currentSubTopic) {
        const currentTopicHolder = document.createElement('li');
        currentTopicHolder.classList.add('current-topic-holder');
        currentTopicHolder.innerText = currentTopic;

        const currentSubTopicHolder = document.createElement('li');
        currentSubTopicHolder.classList.add('current-sub-topic-holder');
        currentSubTopicHolder.innerText = currentSubTopic;

        const nextSubTopicBtn = document.createElement('button');
        nextSubTopicBtn.id = 'next-sub-topic-btn';
        nextSubTopicBtn.innerText = 'Next';

        const rightNavDivider = document.createElement('li');
        rightNavDivider.classList.add('right-nav-divider');
        rightNavDivider.innerText = '/';

        rightNav.innerHTML = '';
        rightNavList.innerHTML = '';
        rightNavList.appendChild(currentTopicHolder);
        rightNavList.appendChild(rightNavDivider);
        rightNavList.appendChild(currentSubTopicHolder);
        rightNavList.appendChild(nextSubTopicBtn);
        rightNav.appendChild(rightNavList);
        rightNav.appendChild(customRightNavBorder);
    };
};

function displayRightContent(content) {
    const rightContent = document.getElementById('right-content');
    const currentTopic = localStorage.getItem('currentTopic');
    const currentSubTopicType = localStorage.getItem('currentSubTopicType');
    const currentSubTopicId = localStorage.getItem('currentSubTopic-topicId');
    const currentSubTopic = currentSubTopicType === 'notes' ? 'Notes' : 'Term/Definitions';
    console.log("currentSubTopic: ", currentSubTopic);
    if (currentSubTopic === 'Notes') {
        rightContent.innerHTML = '';
        content.forEach(note => {
            const noteHolder = document.createElement('div');
            noteHolder.classList.add('note-holder');
            noteHolder.innerText = note;
            rightContent.appendChild(noteHolder);
        });
    } else if (currentSubTopic === "Term/Definitions") {

        console.log(content)

        content.forEach(termdef => {
            console.log(termdef);

            const termdefHolder = document.createElement('div');
            termdefHolder.classList.add('termdef-holder');

            const term = document.createElement('p');
            term.classList.add('term');
            term.innerText = termdef.term;

            const definition = document.createElement('p');
            definition.classList.add('definition');
            definition.innerText = termdef.definition;

            termdefHolder.appendChild(term);
            termdefHolder.appendChild(definition);
            
            rightContent.appendChild(termdefHolder);
        });
        
    };

    const test = document.createElement('div');
    test.innerHTML = `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Sed fac ista esse non inportuna;</b> Quodsi, ne quo incommodo afficiare, non relinques amicum, tamen, ne sine fructu alligatus sis, ut moriatur optabis. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit; Nisi autem rerum natura perspecta erit, nullo modo poterimus sensuum iudicia defendere. Duo Reges: constructio interrete. Zeno autem, quod suam, quod propriam speciem habeat, cur appetendum sit, id solum bonum appellat, beatam autem vitam eam solam, quae cum virtute degatur. Non enim iam stirpis bonum quaeret, sed animalis. Tum Piso: Quoniam igitur aliquid omnes, quid Lucius noster? Bonum negas esse divitias, praeposìtum esse dicis? </p>

        <p>Quamquam scripsit artem rhetoricam Cleanthes, Chrysippus etiam, sed sic, ut, si quis obmutescere concupierit, nihil aliud legere debeat. Non prorsus, inquit, omnisque, qui sine dolore sint, in voluptate, et ea quidem summa, esse dico. Nunc omni virtuti vitium contrario nomine opponitur. Ex quo intellegitur idem illud, solum bonum esse, quod honestum sit, idque esse beate vivere: honeste, id est cum virtute, vivere. Est autem a te semper dictum nec gaudere quemquam nisi propter corpus nec dolere. <i>Dici enim nihil potest verius.</i> Nam constitui virtus nullo modo potesti nisi ea, quae sunt prima naturae, ut ad summam pertinentia tenebit. In enumerandis autem corporis commodis si quis praetermissam a nobis voluptatem putabit, in aliud tempus ea quaestio differatur. Est autem eius generis actio quoque quaedam, et quidem talis, ut ratio postulet agere aliquid et facere eorum. </p>

        <p>Quid tanto concursu honestissimorum studiorum, tanto virtutum comitatu, si ea nullam ad aliam rem nisi ad voluptatem conquiruntur? Cum autem dispicere coepimus et sentire quid, simus et quid ab animantibus ceteris differamus, tum ea sequi incipimus, ad quae nati sumus. Sed emolumenta communia esse dicuntur, recte autem facta et peccata non habentur communia. <i>At multis malis affectus.</i> Quae hic rei publicae vulnera inponebat, eadem ille sanabat. Sed ita falsa sunt ea, quae consequuntur, ut illa, e quibus haec nata sunt, vera esse non possint. Neque enim civitas in seditione beata esse potest nec in discordia dominorum domus; Nam prius a se poterit quisque discedere quam appetitum earum rerum, quae sibi conducant, amittere. Egone non intellego, quid sit don Graece, Latine voluptas? Princeps huius civitatis Phalereus Demetrius cum patria pulsus esset iniuria, ad Ptolomaeum se regem Alexandream contulit. </p>

        <p>Quae quidem res efficit, ne necesse sit isdem de rebus semper quasi dictata decantare neque a commentariolis suis discedere. Cur igitur, inquam, res tam dissimiles eodem nomine appellas? Sed est forma eius disciplinae, sicut fere ceterarum, triplex: una pars est naturae, disserendi altera, vivendi tertia. Ab his oratores, ab his imperatores ac rerum publicarum principes extiterunt. Est tamen ea secundum naturam multoque nos ad se expetendam magis hortatur quam superiora omnia. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; </p>

        <p>Non minor, inquit, voluptas percipitur ex vilissimis rebus quam ex pretiosissimis. Nec vero intermittunt aut admirationem earum rerum, quae sunt ab antiquis repertae, aut investigationem novarum. Duarum enim vitarum nobis erunt instituta capienda. Nobis Heracleotes ille Dionysius flagitiose descivisse videtur a Stoicis propter oculorum dolorem. Qui autem esse poteris, nisi te amor ipse ceperit? <b>Illa tamen simplicia, vestra versuta.</b> </p>

        <p>Ille igitur vidit, non modo quot fuissent adhuc philosophorum de summo bono, sed quot omnino esse possent sententiae. <a href="http://loripsum.net/" target="_blank">Hoc ipsum elegantius poni meliusque potuit.</a> Quae etsi mihi nullo modo probantur, tamen Democritum laudatum a ceteris ab hoc, qui eum unum secutus esset, nollem vituperatum. Habes undique expletam et perfectam, Torquate, formam honestatis, quae tota quattuor his virtutibus, quae a te quoque commemoratae sunt, continetur. Huc et illuc, Torquate, vos versetis licet, nihil in hac praeclara epistula scriptum ab Epicuro congruens et conveniens decretis eius reperietis. Epicurus autem cum in prima commendatione voluptatem dixisset, si eam, quam Aristippus, idem tenere debuit ultimum bonorum, quod ille; </p>

        <p>Cetera illa adhibebat, quibus demptis negat se Epicurus intellegere quid sit bonum. Sed mehercule pergrata mihi oratio tua. Fortitudinis quaedam praecepta sunt ac paene leges, quae effeminari virum vetant in dolore. Quod autem ratione actum est, id officium appellamus. <i>Ecce aliud simile dissimile.</i> Quid ergo attinet gloriose loqui, nisi constanter loquare? Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur. At quanta conantur! Mundum hunc omnem oppidum esse nostrum! Incendi igitur eos, qui audiunt, vides. Illud dico, ea, quae dicat, praeclare inter se cohaerere. Beatus autem esse in maximarum rerum timore nemo potest. Ita fit illa conclusio non solum vera, sed ita perspicua, ut dialectici ne rationem quidem reddi putent oportere: si illud, hoc; Varietates autem iniurasque fortunae facile veteres philosophorum praeceptis instituta vita superabat. <i>Itaque hic ipse iam pridem est reiectus;</i> <b>An hoc usque quaque, aliter in vita?</b> </p>

        <p>Nos quidem Virtutes sic natae sumus, ut tibi serviremus, aliud negotii nihil habemus. <a href="http://loripsum.net/" target="_blank">Est, ut dicis, inquit;</a> Hic, qui utrumque probat, ambobus debuit uti, sicut facit re, neque tamen dividit verbis. Sit hoc ultimum bonorum, quod nunc a me defenditur; Si enim ita est, vide ne facinus facias, cum mori suadeas. Cave putes quicquam esse verius. Ex quo, id quod omnes expetunt, beate vivendi ratio inveniri et comparari potest. Negat enim tenuissimo victu, id est contemptissimis escis et potionibus, minorem voluptatem percipi quam rebus exquisitissimis ad epulandum. </p>

        <p>Indicant pueri, in quibus ut in speculis natura cernitur. Aliis esse maiora, illud dubium, ad id, quod summum bonum dicitis, ecquaenam possit fieri accessio. Itaque hoc frequenter dici solet a vobis, non intellegere nos, quam dicat Epicurus voluptatem. Cur fortior sit, si illud, quod tute concedis, asperum et vix ferendum putabit? An potest, inquit ille, quicquam esse suavius quam nihil dolere? Est enim effectrix multarum et magnarum voluptatum. Idcirco enim non desideraret, quia, quod dolore caret, id in voluptate est. </p>
    `
    rightContent.innerHTML = '';
    //rightContent.appendChild(test);
}

fetchSubject();