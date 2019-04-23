DROP TABLE IF EXISTS wasser;

CREATE TABLE wasser(
    id SERIAL PRIMARY KEY,
    club_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL UNIQUE,
    club VARCHAR(200) NOT NULL,
    adress VARCHAR(250) NOT NULL,
    description TEXT,
    rules TEXT,
    picture TEXT,
    stocking TEXT
);
