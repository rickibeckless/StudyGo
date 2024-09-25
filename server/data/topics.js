// import { nanoid} from 'nanoid';
// let idList = [];
// for (let i = 0; i < 18; i++) {
//     idList.push(nanoid());
// }
// console.log(idList);

const topicsData = [
    {
        "id": "w-Ec29J6_tCDbkbA8DQxx",
        "name": "Addition of Whole Numbers",
        "description": "Learn how to add whole numbers",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "unitId": "cHaTq8MG3-QT_57as-RLA",
        "notes": [
            "Addition is the process of combining two or more numbers to get a sum.",
            "The numbers being added are called addends.",
            "The result of addition is called the sum."
        ],
        "termdefs": [
            {
                "term": "Addends",
                "definition": [
                    "The numbers being added.", 
                    "Test definition."
                ]
            },
            {
                "term": "Sum",
                "definition": "The result of addition."
            }
        ]
    },
    {
        "id": "PvgK8zAbdGFitDEZt3eOd",
        "name": "Addition of Decimals",
        "description": "Learn how to add decimals",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "unitId": "cHaTq8MG3-QT_57as-RLA",
        "notes": [
            "When adding decimals, line up the decimal points.",
            "If the numbers have different number of decimal places, add zeros to the right of the number with fewer decimal places."
        ],
        "termdefs": [
            {
                "term": "Decimal Point",
                "definition": "A period used to separate the whole number part from the fractional part of a number."
            },
            {
                "term": "Decimal Places",
                "definition": "The number of digits to the right of the decimal point."
            }
        ]
    },
    {
        "id": "78e0ExnSiIza04J6kzD7g",
        "name": "Addition of Fractions",
        "description": "Learn how to add fractions",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "unitId": "cHaTq8MG3-QT_57as-RLA",
        "notes": [
            "When adding fractions, make sure the denominators are the same.",
            "If the denominators are different, find the least common denominator."
        ],
        "termdefs": [
            {
                "term": "Fractions",
                "definition": "Numbers that represent parts of a whole."
            },
            {
                "term": "Denominator",
                "definition": "The number below the fraction bar that tells how many equal parts the whole is divided into."
            }
        ]
    },
    {
        "id": "yny2k8vyn91q5IBytGw7e",
        "name": "Subtraction of Whole Numbers",
        "description": "Learn how to subtract whole numbers",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "unitId": "5r7g0JWZYX2mcNYDygVRT",
        "notes": [
            "Subtraction is the process of taking one number away from another.",
            "The number being subtracted is called the subtrahend.",
            "The result of subtraction is called the difference."
        ],
        "termdefs": [
            {
                "term": "Subtrahend",
                "definition": "The number being subtracted."
            },
            {
                "term": "Difference",
                "definition": "The result of subtraction."
            }
        ]
    },
    {
        "id": "a_uHreruzhSI_zuFVNzEf",
        "name": "Subtraction of Decimals",
        "description": "Learn how to subtract decimals",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "HRnC-GqvCbK6yFA1A9f-S",
        "unitId": "5r7g0JWZYX2mcNYDygVRT",
        "notes": [
            "When subtracting decimals, line up the decimal points.",
            "If the numbers have different number of decimal places, add zeros to the right of the number with fewer decimal places."
        ],
        "termdefs": [
            {
                "term": "Decimal Point",
                "definition": "A period used to separate the whole number part from the fractional part of a number."
            },
            {
                "term": "Decimal Places",
                "definition": "The number of digits to the right of the decimal point."
            }
        ]
    },
    {
        "id": "03qKi1O84v2GNYR0eOfjN",
        "name": "Introduction to Limits",
        "description": "Basic concept of limits in calculus.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "LKMmCSvKr3Ao5sHZyzGF7",
        "unitId": "DLHmzUSfjCkQNL4VbhNpM",
        "notes": [
            "Limits describe the behavior of a function as it approaches a particular point.",
            "They are fundamental to the study of calculus, providing the basis for derivatives and integrals."
        ],
        "termdefs": [
            {
                "term": "Limit",
                "definition": "The value that a function approaches as the input approaches some value."
            },
            {
                "term": "Derivative",
                "definition": "A measure of how a function changes as its input changes."
            }
        ]
    },
    {
        "id": "2YxIkHeBGx6sYuwMvtUbn",
        "name": "Calculating Limits",
        "description": "Techniques for calculating limits of functions.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "LKMmCSvKr3Ao5sHZyzGF7",
        "unitId": "DLHmzUSfjCkQNL4VbhNpM",
        "notes": [
            "Limits can be calculated using various methods such as direct substitution, factoring, and rationalizing.",
            "Understanding one-sided limits is crucial for analyzing the behavior of functions."
        ],
        "termdefs": [
            {
                "term": "One-sided Limit",
                "definition": "The value a function approaches from one side of a specific point."
            },
            {
                "term": "Direct Substitution",
                "definition": "A method of finding the limit by directly substituting the point into the function."
            }
        ]
    },
    {
        "id": "n3YHL5wJomU1zk4JFyxsZ",
        "name": "Limits at Infinity",
        "description": "Understanding the behavior of functions as they approach infinity.",
        "subjectId": "UUnAetwV17vvuShPNJCJB",
        "classId": "LKMmCSvKr3Ao5sHZyzGF7",
        "unitId": "DLHmzUSfjCkQNL4VbhNpM",
        "notes": [
            "Limits at infinity describe how a function behaves as the input grows larger or smaller without bound.",
            "They are used to understand the asymptotic behavior of functions."
        ],
        "termdefs": [
            {
                "term": "Asymptote",
                "definition": "A line that a graph of a function approaches but never touches."
            },
            {
                "term": "Horizontal Asymptote",
                "definition": "A horizontal line that the graph of a function approaches as x approaches infinity or negative infinity."
            }
        ]
    },
    {
        "id": "0F7mZ3gVKT7n5Cc9q1oxD",
        "name": "Biomes",
        "description": "Different types of biomes and their characteristics.",
        "subjectId": "HvpCcQk3uBH4N-G0Z4W7Q",
        "classId": "RyEoI9HQrclM9gLJhDx89",
        "unitId": "eZzRhprJXjMZuXTcnqFi9",
        "notes": [
            "Biomes are large regions characterized by specific climate conditions and ecosystems.",
            "Examples include forests, deserts, and tundras."
        ],
        "termdefs": [
            {
                "term": "Ecosystem",
                "definition": "A community of living organisms and their physical environment interacting as a system."
            },
            {
                "term": "Climate",
                "definition": "The long-term pattern of weather conditions in a region."
            }
        ]
    },
    {
        "id": "Lxvh87YOXJ8FaytIkQJxL",
        "name": "Energy Flow",
        "description": "How energy flows through ecosystems.",
        "subjectId": "HvpCcQk3uBH4N-G0Z4W7Q",
        "classId": "RyEoI9HQrclM9gLJhDx89",
        "unitId": "eZzRhprJXjMZuXTcnqFi9",
        "notes": [
            "Energy flows through ecosystems in food chains and food webs.",
            "The primary source of energy is the sun, which is converted into chemical energy by producers."
        ],
        "termdefs": [
            {
                "term": "Food Chain",
                "definition": "A series of organisms each dependent on the next as a source of food."
            },
            {
                "term": "Producer",
                "definition": "An organism that can make its own food through photosynthesis or chemosynthesis."
            }
        ]
    },
    {
        "id": "Xj8n9wNBOF2mViWytPpz6",
        "name": "Food Webs",
        "description": "The complexity of food webs and trophic levels.",
        "subjectId": "HvpCcQk3uBH4N-G0Z4W7Q",
        "classId": "RyEoI9HQrclM9gLJhDx89",
        "unitId": "eZzRhprJXjMZuXTcnqFi9",
        "notes": [
            "A food web is a network of food chains, showing how energy and nutrients are passed among organisms.",
            "It illustrates the complex feeding relationships in an ecosystem."
        ],
        "termdefs": [
            {
                "term": "Trophic Level",
                "definition": "The position an organism occupies in a food chain or food web."
            },
            {
                "term": "Consumer",
                "definition": "An organism that eats other organisms for energy."
            }
        ]
    },
    {
        "id": "FVLMoShT6GPKUj0b9PbEJ",
        "name": "Humanism",
        "description": "The humanist movement and its influence during the Renaissance.",
        "subjectId": "GheaHQNuqrOcM6S_uc5Ox",
        "classId": "ZTChGslRvPmjy5IqZ_KON",
        "unitId": "UX8Vq1h2m6FNc5wq3cBQv",
        "notes": [
            "Humanism emphasized the value of human potential and achievements.",
            "It was a response to the medieval focus on religion and the afterlife."
        ],
        "termdefs": [
            {
                "term": "Renaissance",
                "definition": "A period of cultural rebirth from the 14th to the 17th century in Europe."
            },
            {
                "term": "Secularism",
                "definition": "A doctrine that rejects religion and religious considerations in public affairs."
            }
        ]
    },
    {
        "id": "q7nXJeUIu4W0VfKNiLOKd",
        "name": "Art and Culture",
        "description": "The explosion of art and culture during the Renaissance.",
        "subjectId": "GheaHQNuqrOcM6S_uc5Ox",
        "classId": "ZTChGslRvPmjy5IqZ_KON",
        "unitId": "UX8Vq1h2m6FNc5wq3cBQv",
        "notes": [
            "Renaissance art focused on human beauty and nature, using perspective and realism.",
            "Key figures include Leonardo da Vinci and Michelangelo."
        ],
        "termdefs": [
            {
                "term": "Perspective",
                "definition": "An artistic technique that creates the appearance of three dimensions on a flat surface."
            },
            {
                "term": "Realism",
                "definition": "An artistic movement focusing on depicting subjects as they appear in everyday life."
            }
        ]
    },
    {
        "id": "P2gf6D1P8bk4qmcLWxVRo",
        "name": "Political Changes",
        "description": "Major political changes in Europe during the Renaissance.",
        "subjectId": "GheaHQNuqrOcM6S_uc5Ox",
        "classId": "ZTChGslRvPmjy5IqZ_KON",
        "unitId": "UX8Vq1h2m6FNc5wq3cBQv",
        "notes": [
            "The Renaissance saw the rise of powerful city-states and the decline of feudalism.",
            "It also marked the beginning of nation-states in Europe."
        ],
        "termdefs": [
            {
                "term": "Feudalism",
                "definition": "A medieval European social system in which land was exchanged for military service and loyalty."
            },
            {
                "term": "City-state",
                "definition": "A city that with its surrounding territory forms an independent state."
            }
        ]
    }
];

export default topicsData;