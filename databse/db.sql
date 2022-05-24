CREATE DATABASE moduloacceso;
USE moduloacceso;
CREATE TABLE users(
    id INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
describe users;

alter table users add created_at timestamp NOT NULL default current_timestamp;
