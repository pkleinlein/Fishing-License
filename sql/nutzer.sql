DROP TABLE IF EXISTS nutzer;

CREATE TABLE nutzer(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    birthday VARCHAR(25) NOT NULL,
    birthplace VARCHAR(100) NOT NULL,
    street VARCHAR(200) NOT NULL,
    postcode INTEGER NOT NULL,
    licensenumber INTEGER NOT NULL UNIQUE,
    photo VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
