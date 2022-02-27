CREATE DATABASE retocarvajal;

CREATE TABLE product (
    id_p SERIAL PRIMARY KEY,
    p_name TEXT NOT NULL,
    p_price INTEGER NOT NULL,
    p_stock INTEGER NOT NULL
);

CREATE TABLE client (
    id_c SERIAL PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_email TEXT NOT NULL,
    c_password TEXT NOT NULL
);

CREATE TABLE history(
    id_h SERIAL PRIMARY KEY,
    c_id INTEGER REFERENCES client(id_c),
    h_info TEXT NOT NULL
);

CREATE TABLE clientvshistory (
    c_id INTEGER NOT NULL REFERENCES client(id_c),
    h_id INTEGER NOT NULL REFERENCES  history(id_h)
);

