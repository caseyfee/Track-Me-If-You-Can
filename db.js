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
        database: process.env.DB,
    },
    console.log(`Connected to the arthouse_db database.`)
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
        // userSearch();
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

    // Function that will pull up employee list 
    async employeeList() {
        const employeeQuery = `SELECT id AS value, name FROM department;`;
        const employee = await db.query(employeeQuery);
        return employee;
    },

    updateEmployeeRole: async function () {
        try {
            await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "uRoleName",
                        message: "Who needs a new role?",
                        choices: this.getAllEmployees(),
                    },
                    {
                        type: "input",
                        name: "uRoleid",
                        message: "What is their new role's id?",
                    },
                    // {
                    //     type: "input",
                    //     name: "uRoleDept",
                    //     message: "What is the department id?",
                    // },
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
                            name: input.uRoleName,
                            role_id: input.uRoleid,
                            // department_id: input.uRoleDept
                        },
                    )
                })
        } catch (err) {
            console.error(err)
        }
        // userSearch();
    },

    addDept: async function () {
        try {
            const input = await inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "aDeptName",
                        message: "What is the dept's name?",
                    }
                ])


            await db.promise().query('INSERT INTO department (name) VALUES (?)',
                input.aDeptName)
            console.log("added department!")
        } catch (err) {
            console.error(err);
        }
    },
    addRole: async function () {
        try {
            const answers = await inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "title",
                        message: "What is the role's name?",
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the new role's salary?",
                    },
                    {
                        type: "input",
                        name: "department_id",
                        message: "What is the new role's deptartment id?",
                    },
                ])
            // const [input] = await db.promise().query("SELECT * FROM employees");

            await db.promise().query(
                'INSERT INTO roles SET ?', answers
            )

            console.log("role added!");
        } catch (err) {
            console.error(err)
        }
    },

    addEmployee: async function () {
        try {
            const answers = await inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "aEmployeeFName",
                        message: "What is the employee's first name?",
                    },
                    {
                        type: "input",
                        name: "aEmployeeLName",
                        message: "What is the employee's last name?",
                    },
                    {
                        type: "input",
                        name: "aEmployeeManagerid",
                        message: "What is the new employee's manager id?",
                    },
                    
                // THEN I am prompted to enter the employee’s first name, last name, 
                // role, and manager, and that employee is added to the database
                // const [input] = await db.promise().query("SELECT * FROM employees");
                   await db.promise().query(
                        'INSERT INTO employees SET ?',
                        {
                            first_name: answers.aEmployeeFName,
                            last_name: answers.aEmployeeLName,
                        },
                    )
            
            console.log(answers);
            return input
        } catch (err) {
            console.error(err)
        }
    },
}



module.exports = queries
