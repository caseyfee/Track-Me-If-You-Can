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
        ]
        )

        .then((data) => {
            const {choice} = data;
                        
            switch (choice){
                case "View all departments?":
                    // newChoice = new getAllDept();
                    db.getAllDept();
                    companySearch();
                    break;
                case "View all roles?":
                    db.getAllRoles();
                    companySearch();
                    break;
                case "View all employees?":
                    db.getAllEmployees();
                    companySearch();
                    break;
                case "Update a role?":
                    db.updateRole();
                    companySearch();
                    break;
            }
        }
        )
            
}
companySearch();