DROP DATABASE IF EXISTS role_db;
CREATE DATABASE role_db;

USE role_db;

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
);
