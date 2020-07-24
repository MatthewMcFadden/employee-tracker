const inquirer = require("inquirer");

// Connection to Database

// Introduction
function Introduction() {
  inquirer.prompt({
    name: "begin",
    type: "list",
    message: "What would you like to do?",
    choices:
      [
        "View All Employees",
        "View Employees by Department",
        "View Employees by Role",
        "Add Employee",
        "Update Employee's Role",
        "Finish"
      ]
  })
  .then(function (answer) {
    if (answer.begin === "View All Employees") {
      viewAllEmployees();
    }
    else if (answer.begin === "View Employees by Department") {
      viewByDepartment();
    }
    else if (answer.begin === "View Employees by Role") {
      viewByRole();
    }
    else if (answer.begin === "Add Employee") {
      addEmployee();
    }
    else if (answer.begin === "Update Employee's Role") {
      updateEmployeeRole();
    }
    else if (answer.begin === "Finish") {
      console.log("---> All Finished <---");
    }
    else {
      connection.end();
    }
  })
}

// View All Employees
viewAllEmployees();

// View By Department
viewByDepartment();

// View By Role
viewByRole();

// Add New Employee
addEmployee();

// Update Employee Role
updateEmployeeRole();