const inquirer = require("inquirer");
const { updateRole } = require("./db");
const db = require("./db");

async function companySearch(){


    inquirer.prompt(
        [
            {
                type:"list",
                name: "choice",
                message: "What would you like to do?",
                choices: ['View all departments?', 'View all roles?', 'View all employees?', 'Update a role?'],
            },
            {
                type:"list",
                name: "continue",
                message: "What would you like to search/do something else?",
                choices: ['Yes', 'No', ],
            }
        ]
        )

        .then((data) => {
            const {choice} = data;
                        
            switch (choice){
                case "View all departments?":
                    // newChoice = new getAllDept();
                    db.getAllDept();
                    inquirer.prompt(
                        [
                            {
                                type:"list",
                                name: "continue",
                                message: "What would you like to search/do something else?",
                                choices: ['Yes', 'No'],
                            }
                        ]
                        )
                    break;
                case "View all roles?":
                    db.getAllRoles();
                    break;
                case "View all employees?":
                    db.getAllEmployees();
                    break;
                case "Update a role?":
                    db.updateRole();
                    break;
            }
        }
        )
            
}
companySearch();