const inquirer = require("inquirer");
const db = require("./db");
const queries = require("queries");

async function addNewRole(){

     depts = await db.getAllDept();



    inquirer.prompt(
        [
            {
                type:"list",
                name: "choice",
                message: "What would you like to do?",
                choices: ['View all departments?', 'View all roles?', 'View all employees?', 'Update a role?'],
            }
        ]
        )

        .then(() => {
            // const {shape, text, textColor, bgColor} = data;
            
            var newChoice;
            
            switch (choice){
                case "View all departments?":
                    newChoice = new getAllDept();
                    break;
                case "View all roles?":
                    newChoice = new getAllRoles();
                    break;
                case "View all employees?":
                    newChoice = new getAllEmployees();
                    break;
                case "Update a role?":
                    updateRole = new Square(bgColor, textColor, text);
                    break;
            }
        }
        )
            
}