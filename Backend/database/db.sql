CREATE DATABASE retocarvajal;

CREATE TABLE client (
    id_c SERIAL PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_email TEXT NOT NULL UNIQUE,
    c_password TEXT NOT NULL
);

CREATE TABLE admin (
    id_a SERIAL PRIMARY KEY,
    a_name TEXT NOT NULL,
    a_email TEXT NOT NULL UNIQUE,
    a_password TEXT NOT NULL
);

CREATE TABLE product (
    id_p SERIAL PRIMARY KEY,
    p_name TEXT NOT NULL,
    p_price BIGINT NOT NULL,
    p_amount INT NOT NULL,
    p_info TEXT NOT NULL,
    p_img TEXT NOT NULL,
    p_category TEXT NOT NULL
);


