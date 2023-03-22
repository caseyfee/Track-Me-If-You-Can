const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
require('console.table');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
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
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    getAllRoles: async function () {
        try {
            const [rows] = await db.promise().query("SELECT * FROM roles");
            return rows
        } catch (err) {
            console.error(err)
        }
    }, 

    getAllEmployees: async function () {
        try {
            const [rows] = await db.promise().query("SELECT * FROM employees");
            return rows
        } catch (err) {
            console.error(err)
        }
    },

    updateEmployees: async function () {
        try {
            // is promise().post a real thing?
            const [rows] = await db.promise().post("SELECT * FROM employees");
            return rows
        } catch (err) {
            console.error(err)
        }
    }
}



module.exports = queries