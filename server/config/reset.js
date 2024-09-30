import { pool } from './database.js';
import './dotenv.js';
// import subjectData from '../data/subjects.js';
// import classData from '../data/classes.js';
// import unitData from '../data/units.js';
// import topicData from '../data/topics.js';

const executeQuery = async (query, successMessage) => {
    try {
        await pool.query(query);
        console.log(successMessage);
    } catch (err) {
        console.error(`Error executing query: ${err.message}`);
    }
};

// const createSubjectsTable = async () => {
//     const createTableQuery = `
//     DROP TABLE IF EXISTS subjects;
//     CREATE TABLE IF NOT EXISTS subjects (
//       unique_string_id VARCHAR(255) PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL
//     );
//   `;
//     await executeQuery(createTableQuery, 'Subjects table created successfully');
// };

// const createClassesTable = async () => {
//     const createTableQuery = `
//     DROP TABLE IF EXISTS classes;
//     CREATE TABLE IF NOT EXISTS classes (
//       unique_string_id VARCHAR(255) PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL,
//       subjectId VARCHAR(255) REFERENCES subjects(unique_string_id) NOT NULL,
//       date_created DATE NOT NULL,
//       date_updated DATE NOT NULL
//     );
//   `;
//     await executeQuery(createTableQuery, 'Classes table created successfully');
// };

// const createUnitsTable = async () => {
//     const createTableQuery = `
//     DROP TABLE IF EXISTS units;
//     CREATE TABLE IF NOT EXISTS units (
//       unique_string_id VARCHAR(255) PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL,
//       learning_objectives TEXT[] NOT NULL,
//       unit_outcomes TEXT NOT NULL,
//       prerequisites TEXT NOT NULL,
//       subjectId VARCHAR(255) REFERENCES subjects(unique_string_id) NOT NULL,
//       classId VARCHAR(255) REFERENCES classes(unique_string_id) NOT NULL
//     );
//   `;
//     await executeQuery(createTableQuery, 'Units table created successfully');
// };

const createTopicsTable = async () => {
    //  const createTableQuery = `
    //   DROP TABLE IF EXISTS topics;
    //   CREATE TABLE IF NOT EXISTS topics (
    //     unique_string_id VARCHAR(255) PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     description TEXT NOT NULL,
    //     subjectId VARCHAR(255) REFERENCES subjects(unique_string_id) NOT NULL,
    //     classId VARCHAR(255) REFERENCES classes(unique_string_id) NOT NULL,
    //     unitId VARCHAR(255) REFERENCES units(unique_string_id) NOT NULL,
    //     notes TEXT[],
    //     terms_defs JSONB NOT NULL
    //   );
    //      `;
    //   await executeQuery(createTableQuery, 'Topics table created successfully');

    const addColumnQuery = `
        ALTER TABLE topics 
        DROP COLUMN IF EXISTS lessons;
        ALTER TABLE topics
        ADD COLUMN IF NOT EXISTS lessons JSONB DEFAULT '[]';
    `;

    try {
        await executeQuery(addColumnQuery, 'Column lessons added to topics table successfully');
    } catch (error) {
        console.error('Error adding column to topics table:', error);
    }
};

// const seedData = async (tableName, data, insertQueryText, valueMapper) => {
//     for (const item of data) {
//         const values = valueMapper(item);
//         try {
//             await pool.query({ text: insertQueryText, values });
//             console.log(`${tableName} added successfully`);
//         } catch (err) {
//             console.error(`Error inserting into ${tableName}: ${err.message}`);
//         }
//     }
// };

// const seedTables = async () => {
//     await createSubjectsTable();
//     await createClassesTable();
//     await createUnitsTable();
//     await createTopicsTable();

//     await seedData(
//         'subjects',
//         subjectData,
//         'INSERT INTO subjects (unique_string_id, name, description) VALUES ($1, $2, $3)',
//         (subject) => [subject.id, subject.name, subject.description]
//     );

//     await seedData(
//         'classes',
//         classData,
//         'INSERT INTO classes (unique_string_id, name, description, subjectId, date_created, date_updated) VALUES ($1, $2, $3, $4, $5, $6)',
//         (classObj) => [
//             classObj.id,
//             classObj.name,
//             classObj.description,
//             classObj.subjectId,
//             classObj.date_created,
//             classObj.date_updated
//         ]
//     );

//     await seedData(
//         'units',
//         unitData,
//         'INSERT INTO units (unique_string_id, name, description, learning_objectives, unit_outcomes, prerequisites, subjectId, classId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
//         (unit) => [
//             unit.id,
//             unit.name,
//             unit.description,
//             unit.learningObjectives,
//             unit.unitOutcome,
//             unit.prerequisites,
//             unit.subjectId,
//             unit.classId
//         ]
//     );

//     await seedData(

//     );
// };

//seedTables();
createTopicsTable();