const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username is in the other document,
        user: process.env.DB_USERNAME,
        // MySQL password in other document
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    },
    console.log(`Connected to the ArtHouse_db database.`)
);


const queries = {
    getAllDept: async function () {
        try {
            const [rows] = await db.promise().query("SELECT * FROM department");
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    getAllRoles: async function () {
        try {
            const [rows] = await db.promise().query("SELECT * FROM roles");
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    getAllEmployees: async function () {
        try {
            const [rows] = await db.promise().query("SELECT * FROM employees");
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    updateRole: async function () {
        try {
            // is promise().post a real thing? this needs to be updated 
            const [rows] = await db.promise().post("UPDATE reviews SET review = ? WHERE id = ?");
            const params = [req.body.review, req.params.id];
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    addDept: async function () {
        try {
            // is promise().post a real thing? this needs to be updated 
            const [rows] = await db.promise().post("INSERT INTO departments (dept_name) VALUES (?)");
            
            const params = [body.movie_name];

            db.query(sql, params, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: body
                });
            });
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },
    addRole: async function () {
        try {
            // is promise().post a real thing? this needs to be updated 
            const [rows] = await db.promise().post("SELECT * FROM employees");
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    addEmployee: async function () {
        try {
            // is promise().post a real thing? this needs to be updated 
            const [rows] = await db.promise().post("SELECT * FROM employees");
            console.log(rows);
            return rows
        } catch (err) {
            console.error(err)
        }
    },
}



module.exports = queries
// module.exports = {
//     getAllDept,
//     getAllRoles,
//     getAllEmployees,
//     updateRole,
// }