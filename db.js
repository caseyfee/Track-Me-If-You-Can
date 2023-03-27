const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');
const inquirer = require("inquirer");
require('console.table');
// const index = require("./index");
// import { userSearch } from "./index";
const userSearch = require('./index');


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
        userSearch();
    },

    getAllRoles: async function () {
        try {
            const [input] = await db.promise().query("SELECT * FROM roles");
            console.table(input);
            return input
        } catch (err) {
            console.error(err)
        }
        userSearch();
    },

    getAllEmployees: async function () {
        try {
            const [input] = await db.promise().query("SELECT * FROM employees");
            console.table(input);
            return input
        } catch (err) {
            console.error(err)
        }
        userSearch();
    },

    // Function that will pull up employee list 
    async employeeList() {
    const employeeQuery = `SELECT id AS value, name FROM department;`;
    const employee = await db.query(employeeQuery);
    return employee;
    },

    updateRole: async function () {
        try {
            await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "uRoleName",
                        message: "What is the role's name?",
                        list: employeeList(),
                        when(answers) {
                            return answers.task === "What is the employee's first name?";
                        }
                    },
                    {
                        type: "input",
                        name: "uRoleSalary",
                        message: "What is the role's salary?",
                    },
                    {
                        type: "input",
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
        userSearch();
    },

    addDept: async function () {
         {
            await inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "aDeptName",
                        message: "What is the dept's name?",
                    },
                    // {
                    //     type: "input",
                    //     name: "aDeptName",
                    //     message: "What is the dept's id?",
                    // },
                ])

                .then(await function(input){
                    db.query ('INSERT INTO department SET ?',
                    {
                      name: input.aDeptName,
                    //   id: "005"
                    },
                    function (err) { 
                        if(err) throw err;
                        // ${input.aDeptid}
                        console.log(`added department id: ${input.aDeptName} `);
                        // userSearch();
                     }
                    )
                    });
        }
        // userSearch();
    },
    addRole: async function () {
        try {
            await inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "aRoleName",
                        message: "What is the role's name?",
                    },
                    {
                        type: "input",
                        name: "aRoleSalary",
                        message: "What is the new role's salary?",
                    },
                    {
                        type: "input",
                        name: "aRoleDept",
                        message: "What is the new role's deptartment id?",
                    },
                    {
                        type: "input",
                        name: "aRoleManager",
                        message: "What is the new role's manager id?",
                    },
                ])
                // is promise().post a real thing? this needs to be updated 
                // const [input] = await db.promise().query("SELECT * FROM employees");

                .then(await function (input) {
                    db.promise().query(
                        'INSERT INTO roles SET ?',
                        {
                            title: input.aRoleName,
                            salary: input.aRoleSalary,
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
        // userSearch();
    },

    addEmployee: async function () {
        try {
            inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "aEmployeeFName",
                        message: "What is the employee's first name?",
                    },
                    {
                        type: "list",
                        name: "aEmployeeLName",
                        message: "What is the employee's last name?",
                    },
                    {
                        type: "input",
                        name: "aEmployeeRole",
                        message: "What is this individual's new role?",
                    },
                    {
                        type: "input",
                        name: "aEmployeeManager",
                        message: "What is this individual's manager's id?",
                    },
                ])
            // THEN I am prompted to enter the employee’s first name, last name, 
            // role, and manager, and that employee is added to the database
            const [input] = await db.promise().query("SELECT * FROM employees");
            console.log(input);
            return input
        } catch (err) {
            console.error(err)
        }
        userSearch();
    },
}



module.exports = queries
