CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(40),
    email VARCHAR(60),
    phone VARCHAR(15)
);

CREATE TABLE director (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(40),
    email VARCHAR(60),
    phone VARCHAR(15)
);

CREATE TABLE planner (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(40),
    email VARCHAR(60),
    phone VARCHAR(15)
);

CREATE TABLE designer (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(40),
    email VARCHAR(60),
    phone VARCHAR(15)
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(40),
    srt_date DATE,
    end_date DATE,
    price INTEGER,
    id_client INTEGER,
    id_director INTEGER,
    id_planner INTEGER,
    id_designer INTEGER,
    FOREIGN KEY (id_client) REFERENCES client(id),
    FOREIGN KEY (id_director) REFERENCES director(id),
    FOREIGN KEY (id_planner) REFERENCES planner(id),
    FOREIGN KEY (id_designer) REFERENCES designer(id)
);