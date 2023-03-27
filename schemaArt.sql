DROP DATABASE IF EXISTS arthouse_db;
CREATE DATABASE arthouse_db;

USE arthouse_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  manager_id INT,
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT AUTO_INCREMENT, 
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,  
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL
);



