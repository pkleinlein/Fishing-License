DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    buyer_first VARCHAR(200) NOT NULL,
    buyer_last VARCHAR(200) NOT NULL,
    buyer_street VARCHAR(200) NOT NULL,
    buyer_postcode INTEGER NOT NULL,
    buyer_birthplace VARCHAR(200) NOT NULL,
    buyer_licensenumber INTEGER NOT NULL,
    club_name VARCHAR(200) NOT NULL,
    water_adress VARCHAR(200) NOT NULL,
    water_rules VARCHAR(200) NOT NULL,
    water_name VARCHAR(200) NOT NULL,
    photo TEXT,
    status INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
