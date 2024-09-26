// nanoid purpose: generate unique id for each new subject object
// import { nanoid } from 'nanoid';
// let idList = [];
// for (let i = 0; i < 15; i++) {
//     idList.push(nanoid());
// }
// console.log(idList);

// add description field to each subject object

const subjectData = [
    {
        "id": "UUnAetwV17vvuShPNJCJB",
        "name": "Math",
        "description": "Math involves the study of numbers, quantities, shapes, and patterns. It provides essential skills for problem-solving and logical reasoning in various fields.",
        "classIds": [
            "HRnC-GqvCbK6yFA1A9f-S", 
            "dtn_1xWqLr9iQEeRalIRO", 
            "ssl-NirCJaiOWygAIotUc",
            "LKMmCSvKr3Ao5sHZyzGF7"
        ]
    },
    {
        "id": "HvpCcQk3uBH4N-G0Z4W7Q",
        "name": "Science",
        "description": "Science explores the natural world through observation, experimentation, and analysis. It encompasses various disciplines like biology, chemistry, and physics to understand the laws governing our universe.",
        "classIds": [
            "ODfd_0AwznO1kYaUaJ64d", 
            "q5JirzJIiAHMRCpPFyirM", 
            "n4fL1RRwNN31i4DUj1sro",
            "RyEoI9HQrclM9gLJhDx89"
        ]
    },
    {
        "id": "GheaHQNuqrOcM6S_uc5Ox",
        "name": "History",
        "description": "History examines past events and societies to understand how they shape our present and future. It emphasizes critical thinking and the evaluation of sources to interpret historical narratives.",
        "classIds": [
            "zo3vl14a0aMNpM_bYjCcA", 
            "YWi0Dir0Y-QKyTzPcdp62", 
            "MP48NKU0UEeDSpFHdooT6",
            "ZTChGslRvPmjy5IqZ_KON"
        ]
    },
    {
        "id": "QX8Jb7XkFgLi4ZUjklY8T",
        "name": "English",
        "description": "English focuses on the study of language and literature, enhancing reading, writing, and communication skills. It fosters creativity and critical analysis through the exploration of diverse texts.",
        "classIds": [
            "y6sMJuD5Q6A_X29iGjMnE",
            "JxBzKndcIf5GBHQGLGD40",
            "rWSi704VUK1e1Ax8uX1ro",
            "MIPBsjgquOEcz7TobY9tS"
        ]
    },
    {
        "id": "d4l2O4JqI7QiYwxlQ1oLE",
        "name": "Computer Science",
        "description": "Computer Science is the study of algorithms, data structures, and programming principles. It equips students with the skills to solve complex problems and innovate using technology.",
        "classIds": [
            "v2bEpFR5UCQks_nIDwnNc",
            "j6BkqG2dbSY4uOo4Gu_Ku",
            "Xc1iHr9VsS5rnwryETpIH",
            "oann01pEAMo6EF-GZ_213"
        ]
    },
    {
        "id": "aEaskEIDmpF9aUKMyn11q",
        "name": "Social Studies",
        "description": "Social Studies examines human society and relationships, integrating history, geography, and culture. It aims to develop informed and engaged citizens through understanding social dynamics.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "89bpUyjNIeAElIavTrpov",
        "name": "Physical Education",
        "description": "Physical Education promotes physical fitness and healthy lifestyle choices through sports and exercise. It encourages teamwork, discipline, and the development of motor skills.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "vjWjHedW3k2_0Z5eF4xxH",
        "name": "Engineering",
        "description": "Engineering applies scientific principles to design and build structures, machines, and systems. It fosters creativity and problem-solving skills in addressing real-world challenges.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "LE228EEj1E4fuyr9LmEM4",
        "name": "Vocational and Life Skills",
        "description": "This subject prepares students for practical life and career skills essential for everyday living. It focuses on hands-on experiences in areas like finance, cooking, and job readiness.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "i46KqCwpivHnaBtWtKvN1",
        "name": "Art",
        "description": "Art encourages creativity and self-expression through various mediums such as painting, sculpture, and digital design. It fosters appreciation for aesthetics and cultural expression.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "nRCyIg1TOiehuz2KLiCwX",
        "name": "Social Sciences",
        "description": "Social Sciences explore human behavior and societal structures, including psychology, sociology, and anthropology. They promote understanding of social issues and the human experience.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "7-IVwLP38ZoVtbqi4c3cf",
        "name": "Foreign Language",
        "description": "Foreign Language studies enhance communication skills and cultural understanding through learning new languages. It broadens perspectives and fosters global awareness.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    },
    {
        "id": "pSQWZ7EOS2hr9_I-sixuZ",
        "name": "Business",
        "description": "Business education focuses on economic principles, entrepreneurship, and management strategies. It equips students with the skills to navigate the corporate world and understand market dynamics.",
        "classIds": [
            "",
            "",
            "",
            ""
        ]
    }
];

export default subjectData;