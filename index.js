const inquirer = require("inquirer");
const db = require("./db.js");
require('console.table');


async function userSearch() {


    const input = await inquirer.prompt(
        [
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    'View all departments?',
                    'View all roles?',
                    'View all employees?',
                    'Update a role?',
                    'Add a Department?',
                    'Add a Role?',
                    'Add an Employee?',
                ],
            },
        ]
    )


    switch (input.choice) {
        case "View all departments?":
            // newChoice = new getAllDept();
            await db.getAllDept();
            break;
        case "View all roles?":
            await db.getAllRoles();
            break;
        case "View all employees?":
            await db.getAllEmployees();
            break;
        case "Update a role?":
            await db.updateEmployeeRole();
            break;
        case "Add a Department?":
            await db.addDept();
            break;
        case "Add a Role?":
            await db.addRole();
            break;
        case "Add an Employee?":
            await db.addEmployee();
            break;
    }
    
    userSearch();


}
userSearch();

// module.exports = {userSearch}