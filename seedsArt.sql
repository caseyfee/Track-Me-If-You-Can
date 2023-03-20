INSERT INTO department (id, name)
VALUES (001, "Artists"),
       (002, "Procurement"),
       (003, "Gallery Sales"),
       (004, "Party Planning Committee");

INSERT INTO roles (id, title, salary, department_id)
VALUES (101, "Lead Artist", 100000, 001),
       (102, "Procurement Lead", 65000, 002),
       (103, "Curator", 80000, 004),
       (104, "Assistant Artist", 75000, 001);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (201, "Georgia", "O'Keeffe", 101, null),
       (202, "Juan", "Hamilton", 104, 201),
       (203, "Casey", "Fee", 103, null),
       (204, "Madeline", "Acri", 102, null),
       (205, "Sam", "Key", 102, 204),
       (206, "Katie", "Messanger", 103, 203);