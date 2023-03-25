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
                    userSearch();
                    break;
                case "View all roles?":
                    db.getAllRoles();
                    userSearch();
                    break;
                case "View all employees?":
                    db.getAllEmployees();
                    userSearch();
                    break;
                case "Update a role?":
                    db.updateRole();
                    userSearch();
                    break;
                case "Add a Department?":
                    db.addDept();
                    userSearch();
                    break;
                case "Add a Role?":
                    db.addRole();
                    userSearch();
                    break;
                case "Add an Employee?":
                    db.updateEmployee();
                    userSearch();
                    break;
            }
        }
        )
            
}
userSearch();