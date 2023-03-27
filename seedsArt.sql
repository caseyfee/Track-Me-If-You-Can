INSERT INTO department (name)
VALUES ("Artists"),
       ("Procurement"),
       ("Gallery Sales"),
       ("Party Planning Committee");

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Artist", 100000, 1),
       ("Procurement Lead", 65000, 2),
       ("Curator", 80000, 3),
       ("Assistant Artist", 75000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Georgia", "O'Keeffe", 1, null),
       ("Juan", "Hamilton", 1, 1),
       ("Casey", "Fee", 2, null),
       ("Madeline", "Acri", 3, null),
       ("Sam", "Key", 3, 2),
       ("Katie", "Messanger", 4, 3);