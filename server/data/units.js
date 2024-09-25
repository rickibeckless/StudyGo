// import { nanoid} from 'nanoid';
// let idList = [];
// for (let i = 0; i < 9; i++) {
//     idList.push(nanoid());
// }
// console.log(idList);

// add longer descriptions, learning objectives, unit goals, and prerequisites to each unit object

const unitsData = [
    {
        "id": "cHaTq8MG3-QT_57as-RLA",
        "name": "Fundamentals of Addition",
        "description": "Fundamentals of Addition is an introductory course designed for students to develop a foundational understanding of one of the most essential operations in mathematics—addition. The course focuses on building a strong grasp of addition as a basic arithmetic skill, applicable in everyday life as well as in more advanced mathematical concepts. Students will explore the principles of addition using whole numbers, decimals, and fractions, and will be introduced to techniques for efficient mental calculation and problem-solving.",
        "learningObjectives": [
            "Understand the basic principles of addition.",
            "Perform addition with whole numbers, decimals, and fractions.",
            "Develop mental calculation skills.",
            "Solve real-life problems involving addition.",
            "Gain an introductory understanding of addition's role in higher mathematics, including algebra and geometry."
        ],
        "unitOutcome": "By the end of Math 101: Fundamentals of Addition, students will have gained confidence and proficiency in performing addition, equipped with the skills to solve problems efficiently and accurately in both academic and real-world settings.",
        "prerequisites": "No prior knowledge of addition is necessary, but basic number recognition and counting skills are recommended.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "topicsIds": [
            'w-Ec29J6_tCDbkbA8DQxx',
            'PvgK8zAbdGFitDEZt3eOd',
            '78e0ExnSiIza04J6kzD7g',
        ]
    },
    {
        "id": "5r7g0JWZYX2mcNYDygVRT",
        "name": "Fundamentals of Subtraction",
        "description": "Fundamentals of Subtraction is an introductory course that helps students develop a solid understanding of subtraction as one of the key operations in mathematics. Students will learn how to subtract whole numbers, decimals, and fractions, and will explore subtraction in various real-life contexts. The course covers basic subtraction techniques, including borrowing (regrouping), and helps students improve their mental subtraction skills for efficiency.",
        "learningObjectives": [
            "Understand the basic principles of subtraction.",
            "Perform subtraction with whole numbers, decimals, and fractions.",
            "Master the borrowing (regrouping) technique in multi-digit subtraction.",
            "Solve practical problems involving subtraction.",
            "Develop mental math strategies for subtraction."
        ],
        "unitOutcome": "By the end of Fundamentals of Subtraction, students will be proficient in performing subtraction with confidence and accuracy, applying these skills in both academic exercises and daily life situations.",
        "prerequisites": "A basic understanding of number recognition and addition is recommended.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "topicsIds": [
            'yny2k8vyn91q5IBytGw7e',
            'a_uHreruzhSI_zuFVNzEf',
            '1zTXAAyhWFjgGePYPB169',
        ]
    },
    {
        "id": "SlSK2eupc3KdqbHbGoxH3",
        "name": "Fundamentals of Multiplication",
        "description": "Fundamentals of Multiplication is a beginner-level course designed to help students understand multiplication as repeated addition and a key arithmetic operation. Students will explore the use of multiplication with whole numbers, decimals, and fractions. The course emphasizes mastering multiplication tables, mental multiplication strategies, and applying multiplication in real-world problems such as area calculations and scaling.",
        "learningObjectives": [
            "Understand multiplication as repeated addition.",
            "Master multiplication tables and basic facts.",
            "Perform multiplication with whole numbers, decimals, and fractions.",
            "Solve real-life problems using multiplication (e.g., area, scaling).",
            "Apply mental math strategies for quick multiplication."
        ],
        "unitOutcome": "By the end of Fundamentals of Multiplication, students will be skilled in using multiplication for a variety of mathematical and real-world applications, confident in their ability to multiply numbers accurately and efficiently.",
        "prerequisites": "A basic understanding of addition and place value is recommended.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "topicsIds": [
            'Rs2FFp8exdJP2i01TI480',
            'mMV2iNL5cgs3-YbMcJ4rn',
            'Yx00mJwt5Xs_KNFTQNEmy',
        ]
    },
    {
        "id": "DLHmzUSfjCkQNL4VbhNpM",
        "name": "Introduction to Limits in Calculus",
        "description": "Introduction to Limits in Calculus is a foundational course for students who are beginning their journey into calculus. This course introduces the concept of limits, one of the fundamental building blocks of calculus. Students will explore the definition of limits, learn how to evaluate limits using algebraic methods, and understand how limits are used to define continuity, derivatives, and integrals.",
        "learningObjectives": [
            "Understand the concept of a limit and how it applies to calculus.",
            "Evaluate limits using algebraic and graphical methods.",
            "Determine limits at infinity and identify undefined limits.",
            "Apply limits to understand continuity of functions.",
            "Lay the groundwork for future study of derivatives and integrals."
        ],
        "unitOutcome": "By the end of Introduction to Limits in Calculus, students will have a deep understanding of the concept of limits and how to evaluate them, preparing them for more advanced calculus topics such as derivatives and integrals.",
        "prerequisites": "A solid understanding of algebra and basic functions is recommended.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "LKMmCSvKr3Ao5sHZyzGF7",
        "topicsIds": [
            "03qKi1O84v2GNYR0eOfjN",
            "2YxIkHeBGx6sYuwMvtUbn",
            "n3YHL5wJomU1zk4JFyxsZ",
        ]
    },
    {
        "id": "eZzRhprJXjMZuXTcnqFi9",
        "name": "Introduction to Ecosystems",
        "description": "Introduction to Ecosystems is a biology course that explores the interactions between living organisms and their environment. Students will study the components of ecosystems, including producers, consumers, and decomposers, and understand how energy flows through these systems. The course covers various types of ecosystems, such as forests, deserts, and oceans, and emphasizes the balance and interdependence within ecosystems.",
        "learningObjectives": [
            "Understand the components and structure of ecosystems.",
            "Identify different roles within an ecosystem (producers, consumers, decomposers).",
            "Explore how energy flows through food chains and food webs.",
            "Examine the balance and interdependence of organisms in an ecosystem.",
            "Recognize the importance of biodiversity and ecosystem conservation."
        ],
        "unitOutcome": "By the end of Introduction to Ecosystems, students will have a comprehensive understanding of how ecosystems function, how living organisms interact within their environments, and the significance of maintaining ecosystem balance and biodiversity.",
        "prerequisites": "Basic knowledge of living organisms and their characteristics is helpful but not required.",
        "subjectId": "HvpCcQk3uBH4N-G0Z4W7Q",
        "classId": "RyEoI9HQrclM9gLJhDx89",
        "topicsIds": [
            "0F7mZ3gVKT7n5Cc9q1oxD",
            "Lxvh87YOXJ8FaytIkQJxL",
            "Xj8n9wNBOF2mViWytPpz6",
        ]
    },
    {
        "id": "UX8Vq1h2m6FNc5wq3cBQv",
        "name": "The Renaissance: A Turning Point in European History",
        "description": "The Renaissance: A Turning Point in European History explores one of the most transformative periods in Europe, spanning the 14th to 17th centuries. This course covers the key events, ideas, and figures of the Renaissance, including advancements in art, science, literature, and philosophy. Students will examine how the Renaissance contributed to the modern world, focusing on influential personalities like Leonardo da Vinci, Michelangelo, and Machiavelli, and how humanism reshaped European culture and thought.",
        "learningObjectives": [
            "Understand the key concepts and origins of the Renaissance.",
            "Analyze the role of humanism and its impact on European thought.",
            "Identify major figures of the Renaissance and their contributions to art, science, and literature.",
            "Examine how the Renaissance influenced political, social, and economic changes in Europe.",
            "Explore the cultural legacy of the Renaissance in shaping modern Europe."
        ],
        "unitOutcome": "By the end of The Renaissance: A Turning Point in European History, students will have a deep understanding of the Renaissance era, including its lasting influence on European art, science, and intellectual thought, as well as the foundations it laid for the modern world.",
        "prerequisites": "Basic knowledge of medieval European history is recommended.",
        "subjectId": "GheaHQNuqrOcM6S_uc5Ox",
        "classId": "ZTChGslRvPmjy5IqZ_KON",
        "topicsIds": [
            "FVLMoShT6GPKUj0b9PbEJ",
            "q7nXJeUIu4W0VfKNiLOKd",
            "P2gf6D1P8bk4qmcLWxVRo",
        ]
    },
    {
        "id": "uHgGjxFzc8dMWo7KPq9yJ",
        "name": "Shakespeare: The Bard's Influence on English Literature",
        "description": "Shakespeare: The Bard's Influence on English Literature delves into the works of William Shakespeare, one of the most influential writers in English literature. Students will explore Shakespeare's major plays and sonnets, analyzing themes, characters, and literary techniques. The course focuses on how Shakespeare's writing reflects the social, political, and philosophical issues of his time, and his lasting impact on drama and storytelling.",
        "learningObjectives": [
            "Understand the historical and cultural context of Shakespeare's works.",
            "Analyze themes and motifs in major plays like 'Hamlet,' 'Macbeth,' and 'Romeo and Juliet.'",
            "Examine Shakespeare's use of language, literary devices, and poetic forms.",
            "Identify key characters and explore their development throughout the plays.",
            "Evaluate Shakespeare's lasting influence on literature and modern drama."
        ],
        "unitOutcome": "By the end of Shakespeare: The Bard's Influence on English Literature, students will have gained a deep appreciation for Shakespeare's contribution to literature and drama, equipped with the ability to analyze and interpret his works within historical and thematic contexts.",
        "prerequisites": "No prior study of Shakespeare is required, though a basic understanding of English literature is helpful.",
        "subjectId": "QX8Jb7XkFgLi4ZUjklY8T",
        "classId": "y6sMJuD5Q6A_X29iGjMnE",
        "topicsIds": [
            "H3LrQ9cJXa6FiVFY5pU7m",
            "1eZQn9bLGJ9Ry4eEjkQoW",
            "pTw9CXUkJmZQx8cE2hnjV",
        ]
    },
    {
        "id": "rwPxNgNFSRb9YOwXfh9pS",
        "name": "Data Types and Variables in Computer Science",
        "description": "Data Types and Variables in Computer Science introduces students to fundamental programming concepts related to storing and manipulating data. The course covers the different types of data (e.g., integers, strings, booleans) and how to use variables to hold and manage this data in programming. Students will learn about memory allocation, data structures, and best practices for variable naming and usage in popular programming languages.",
        "learningObjectives": [
            "Understand the concept of variables and how they are used to store data.",
            "Identify and differentiate between various data types such as integers, floats, strings, and booleans.",
            "Learn how to declare and initialize variables in a programming language.",
            "Explore how data types influence operations and functions in code.",
            "Apply best practices for naming and managing variables efficiently in programs."
        ],
        "unitOutcome": "By the end of Data Types and Variables in Computer Science, students will have a solid understanding of variables and data types, equipped to write simple programs that use data efficiently and effectively.",
        "prerequisites": "No prior programming experience is necessary, though basic familiarity with computers is recommended.",
        "subjectId": "d4l2O4JqI7QiYwxlQ1oLE",
        "classId": "v2bEpFR5UCQks_nIDwnNc",
        "topicsIds": [
            "9Sm4CnVpI7pMCjQ8S1T3J",
            "y4s2UVV9iFhT7gR6c9mDI",
            "S8WYH6F2FwGkNz5ICVgK0",
        ]
    }
];

export default unitsData;