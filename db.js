const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');
const inquirer = require("inquirer");
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
            const [input] = await db.promise().query("SELECT * FROM department");
            console.table(input);
            return input
        } catch (err) {
            console.error(err)
        }
    },

    getAllRoles: async function () {
        try {
            const [input] = await db.promise().query("SELECT * FROM roles");
            console.table(input);
            return input
        } catch (err) {
            console.error(err)
        }
    },

    getAllEmployees: async function () {
        try {
            const [input] = await db.promise().query("SELECT * FROM employees");
            console.table(input);
            return input
        } catch (err) {
            console.error(err)
        }
    },

    updateRole: function () {
        try {
            inquirer.prompt(
                [
                    {
                        type:"input",
                        name: "uRoleName",
                        message: "What is the role's name?",
                    },
                    {
                        type:"input",
                        name: "uRoleSalary",
                        message: "What is the role's salary?",
                    },
                    {
                        type:"input",
                        name: "uRoleDept",
                        message: "What is the department id?",
                    },
                ])
            // is promise().post a real thing? this needs to be updated 
            // const [input] = await db.promise().post("UPDATE reviews SET review = ? WHERE id = ?");
            // const params = [req.body.review, req.params.id];
            // console.log(input);
            // return input
            .then(function (input) {
                db.promise().query(
                  'INSERT INTO roles SET ?',
                  {
                    title: input.uRoleName,
                    salary: input.uRoleName,
                    department_id: input.uRoleDept
                  },
                )
                })
        } catch (err) {
            console.error(err)
        }
    },

    addDept: async function () {
        try {
            inquirer.prompt(
                [
                    {
                        type:"input",
                        name: "aDeptName",
                        message: "What is the dept's name?",
                    },
                ])
            // is promise().post a real thing? this needs to be updated 
            const [input] = await db.promise().query("INSERT INTO departments (dept_name) VALUES (?)");
            
            const params = [body.aDeptName];

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
            console.log(input);
            return input
        } catch (err) {
            console.error(err)
        }
    },
    addRole: function () {
        try {
            inquirer.prompt(
                [
                    {
                        type:"input",
                        name: "aRoleName",
                        message: "What is the role's name (first and last)?",
                    },
                    {
                        type:"input",
                        name: "aRoleSalary",
                        message: "What is the new role's salary?",
                    },
                    {
                        type:"input",
                        name: "aRoleDept",
                        message: "What is the new role's deptartment?",
                    },
                    {
                        type:"input",
                        name: "aRoleManager",
                        message: "Who is the role's manager?",
                    },
                    {
                        type:"input",
                        name: "aRoleManager",
                        message: "Who is the role's manager?",
                    },
                ])
            // is promise().post a real thing? this needs to be updated 
            // const [input] = await db.promise().query("SELECT * FROM employees");
            
            .then(function (input) {
                dbConnection.query(
                  'INSERT INTO roles SET ?',
                  {
                    title: input.aRoleName,
                    salary: input.aRoleName,
                    department_id: input.aRoleDept,
                    manager_id: input.aRoleManager
                  },
                )
                })

            console.log(input);
            return input
        } catch (err) {
            console.error(err)
        }
    },

    // Needs updating!
    updateEmployee: async function () {
        try {
            inquirer.prompt(
                [
                    {
                        type:"list",
                        name: "uEmployeeName",
                        message: "What is the employee's first name?",
                        list: ["1", "2", "3"]
                    },
                    {
                        type:"input",
                        name: "uEmployeeRole",
                        message: "What is this individual's new role?",
                    },
                ])
            // is promise().post a real thing? this needs to be updated 
            const [input] = await db.promise().query("SELECT * FROM employees");
            console.log(input);
            return input
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