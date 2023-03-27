const inquirer = require("inquirer");
const { updateRole } = require("./db");
const db = require("./db");
require('console.table');


async function userSearch(){


    inquirer.prompt(
        [
            {
                type:"list",
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

        .then((data) => {
            const {choice} = data;
                        
            switch (choice){
                case "View all departments?":
                    // newChoice = new getAllDept();
                    db.getAllDept();
                    break;
                case "View all roles?":
                    db.getAllRoles();
                    break;
                case "View all employees?":
                    db.getAllEmployees();
                    break;
                case "Update a role?":
                    db.updateEmployeeRole();
                    break;
                case "Add a Department?":
                    db.addDept();
                    break;
                case "Add a Role?":
                    db.addRole();
                    break;
                case "Add an Employee?":
                    db.addEmployee();
                    break;
            }
        }
        )
            
}
userSearch();

module.exports = {userSearch}