USE employeeDB;

INSERT INTO department (department)
VALUES ('Fundraising'), ('Development'), ('Advising'), ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Fundraising Manager', 90000, 1),
    ('Fundraising Assistant', 45000, 1),
    ('Development Manager', 70000, 2),
    ('Associate Development Manager', 50000, 2),
    ('Lead Advisor', 70000, 3),
    ('Associate Advisor', 50000, 3),
    ('Marketing Manager', 75000, 4),
    ('Associate Marketing Manager', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, 1),
    ('Dwight', 'Schrute', 2, 2),
    ('Jim', 'Halpert', 3, NULL),
    ('Stanley', 'Hudson', 4, NULL),
    ('Phyllis', 'Smith', 5, 3),
    ('Pam', 'Beesley', 6, NULL),
    ('Angela', 'Martin', 7, 4),
    ('Oscar', 'Nunez', 8, NULL);
    ('Kevin', 'Malone', 9, NULL);