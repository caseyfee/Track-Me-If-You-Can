const inquirer = require("inquirer");
const db = require("./db");
const queries = require("queries");

async function addNewRole(){

     depts = await db.getAllDept();



    inquirer.prompt(
        [
            {
                type:"list",
                name: "department_id",
                message: "Which dept",
                choices:
            }
        ]
    )
}