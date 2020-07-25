const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");

// Connection to Database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

Introduction();
// Introduction
function Introduction() {
  inquirer
    .prompt({
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
          "Finish Employee Tracker"
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
      else if (answer.begin === "Finish Employee Tracker") {
        console.log("---- All Finished ----");
      }
      else {
        connection.end();
      }
    });
}

// View All Employees
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)",
  function (err, result) {
    if (err) throw err;
    console.table(result);
    Introduction();
  });
}

// View By Department
function viewByDepartment() {
  inquirer.prompt({
    name: "department",
    type: "list",
    message: "Which department would you like to see employees for?",
    choices: ["Fundraising", "Development", "Advising", "Marketing"]
  })

  .then(function (answer) {
    if (answer.department === "Fundraising" || "Development" || "Advising" || "Marketing") {
      connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE department = ?", [answer.department], function (err, result) {
        if (err) throw err;
        console.table(result);
        Introduction();
      });
    }
  });
}

// View By Role
function viewByRole() {
  inquirer.prompt({
    name: "role",
    type: "list",
    message: "Which role would you like to see employees for?",
    choices:
      [
        "Fundraising Manager",
        "Fundraising Assistant",
        "Development Manager",
        "Associate Development Manager",
        "Lead Advisor",
        "Associate Advisor",
        "Marketing Manager",
        "Associate Marketing Manager"
      ]
  })

  .then(function (answer) {
    if (answer.role === "Fundraising Manager" || "Fundraising Assistant" || "Development Manager" || "Associate Development Manager" || "Lead Advisor" || "Associate Advisor" || "Marketing Manager" || "Associate Marketing Manager") {
      connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE title = ?", [answer.role], function (err, result) {
        if (err) throw err;
        console.table(result);
        Introduction();
      });
    }
  });
}

// Add New Employee
function addEmployee() {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "What is your employees first name?"
    },
    {
      name: "last",
      type: "input",
      message: "What is your employees last name?"
    },
    {
      name: "title",
      type: "list",
      message: "What is your employees role?",
      choices:
        [
          "Fundraising Manager",
          "Fundraising Assistant",
          "Development Manager",
          "Associate Development Manager",
          "Lead Advisor",
          "Associate Advisor",
          "Marketing Manager",
          "Associate Marketing Manager"
        ]
    },
    {
      name: "salary",
      type: "input",
      message: "What is your employees salary?"
    },
    {
      name: "dept",
      type: "list",
      message: "What is your employees department?",
      choices: ["Fundraising", "Development", "Advising", "Marketing"]
    },
    {
      name: "manager",
      type: "list",
      message: "Who is your employees manager?",
      choices: ["Kathy", "Erin", "Paul", "Aubrey", "None"]
    }
  ])

  .then(function (answer) {
    var dept_id;
    if (answer.dept === "Fundraising") {
      dept_id = 1;
    }
    else if (answer.dept === "Development") {
      dept_id = 2;
    }
    else if (answer.dept === "Advising") {
      dept_id = 3;
    }
    else if (answer.dept === "Marketing") {
      dept_id = 4;
    }

    connection.query("INSERT INTO roles SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: dept_id
      },
      function (err, result) {
        if (err) throw err;
      }
    );

    var manager_id;
    if (answer.manager === "Kathy") {
      manager_id = 1;
    }
    else if (answer.manager === "Erin") {
      manager_id = 2;
    }
    else if (answer.manager === "Paul") {
      manager_id = 3;
    }
    else if (answer.manager === "Aubrey") {
      manager_id = 4;
    }
    else if (answer.manager === "None") {
      manager_id = null;
    }

    var role_id;
    if (answer.title === "Fundraising Manager") {
      role_id = 1;
    }
    else if (answer.title === "Fundraising Assistant") {
      role_id = 2;
    }
    else if (answer.title === "Development Manager") {
      role_id = 3;
    }
    else if (answer.title === "Associate Development Manager") {
      role_id = 4;
    }
    else if (answer.title === "Lead Advisor") {
      role_id = 5;
    }
    else if (answer.title === "Associate Advisor") {
      role_id = 6;
    }
    else if (answer.title === "Marketing Manager") {
      role_id = 7;
    }
    else if (answer.title === "Associate Marketing Manager") {
      role_id = 8;
    }

    connection.query("INSERT INTO employee SET ?",
      {
        first_name: answer.first,
        last_name: answer.last,
        role_id: role_id,
        manager_id: manager_id
      },
      function (err, result) {
        if (err) throw err;
        console.log("---- New Employee Added ----");
        Introduction();
      }
    );
  });
}

// Update Employee Role
function updateEmployeeRole() {
  connection.query("SELECT id, first_name, last_name FROM employee", function (err, result) {
    if (err) throw err;
    var choiceArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].id;
      choiceArray.push(choices);        
    }

    questions = [
      {
        name: "employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: choiceArray
      },
      {
        name: "newTitle",
        type: "list",
        message: "What is the employee's new role?",
        choices:
          [
            "Fundraising Manager",
            "Fundraising Assistant",
            "Development Manager",
            "Associate Development Manager",
            "Lead Advisor",
            "Associate Advisor",
            "Marketing Manager",
            "Associate Marketing Manager"
          ]
      }
    ]

    inquirer.prompt(questions)
    .then(function (answer) {
      console.log(answer.employee);
      console.log(answer.newTitle)

      let role_id = 0;

      if (answer.newTitle == "Fundraising Manager") {
        role_id = 1;
      }
      else if (answer.newTitle == "Fundraising Assistant") {
        role_id = 2;
      }
      else if (answer.newTitle == "Development Manager") {
        role_id = 3;
      }
      else if (answer.newTitle == "Associate Development Manager") {
        role_id = 4;
      }
      else if (answer.newTitle == "Lead Advisor") {
        role_id = 5;
      }
      else if (answer.newTitle == "Associate Advisor") {
        role_id = 6;
      }
      else if (answer.newTitle == "Marketing Manager") {
        role_id = 6;
      }
      else if (answer.newTitle == "Associate Marketing Manager") {
        role_id = 6;
      }

      connection.query("UPDATE employee SET role_id = ? WHERE id=?",
        [role_id, answer.employee],
        function (err, result) {
          if (err) throw err;
          console.log("---- Updated Employee ----");
          Introduction();
        }
      )
    });
  })
}