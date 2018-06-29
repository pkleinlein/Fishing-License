DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER,
    photo TEXT
);
