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
           const answers = await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "name",
                        message: "Who needs a new role?",
                        choices: role.map(role => ({
                            name: role.name,
                            value: role.id
                        }))
                    },
                    {
                        type: "input",
                        name: "role_id",
                        message: "What is their new role's id?",
                    },
                ])
                
                    await db.promise().query(
                        'INSERT INTO roles SET ?', answers
                    )
            
        } catch (err) {
            console.error(err)
        }
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
                ])
                
                   await db.promise().query(
                        'INSERT INTO employees (first_name, last_name) VALUES (?)',
                        {
                            first_name: answers.aEmployeeFName,
                            last_name: answers.aEmployeeLName,
                        },
                    )
            
            console.log("added employee");
        } catch (err) {
            console.error(err)
        }
    },
}

module.exports = queries
