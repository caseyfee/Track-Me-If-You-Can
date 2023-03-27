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

    updateEmployeeRole: async function () {
        try {

            // Pulls all the first names
            const input = await db.promise().query("SELECT * FROM employees");

            let mappedArr = input[0].map(employees => ({
                name: employees.first_name,
                value: employees.id
            }))

            // Query all the roles 
            const currentRoles = await db.promise().query("SELECT * FROM roles");

            let rolesArr = input[0].map(roles => ({
                name: roles.title,
                value: roles.id
            }))

            const answers = await inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "first_name",
                        message: "Who needs a new role?",
                        choices: mappedArr
                    },
                    {
                        type: "list",
                        name: "role_id",
                        message: "What is their new role's id?",
                        choices: rolesArr
                    },
                ])


            await db.promise().query(
                'INSERT INTO employees SET ?', answers
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
                        name: "first_name",
                        message: "What is the employee's first name?",
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?",
                    },
                    {
                        type: "input",
                        name: "role_id",
                        message: "What is the new employee's role id?",
                    },
                    {
                        type: "input",
                        name: "manager_id",
                        message: "What is the new employee's manager id?",
                    },
                ])
            // (first_name, last_name, role_id, manager_id) VALUES

            await db.promise().query(
                'INSERT INTO employees SET ?', answers
            )

            console.log("added employee");
        } catch (err) {
            console.error(err)
        }
    },
}

module.exports = queries
