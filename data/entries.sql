BEGIN TRANSACTION;
DROP TABLE IF EXISTS entries;

CREATE TABLE entries (id INTEGER PRIMARY KEY, title TEXT, body TEXT, currentDate TEXT);
INSERT INTO entries(title, body, currentDate) VALUES('Oh Em Gee!', 'I got a new job!', DATE('now'));
INSERT INTO entries(title, body, currentDate) VALUES('Flat tire', 'I cannot believe I got a flat tire!', DATE('now'));
INSERT INTO entries(title, body, currentDate) VALUES('Oh Em Gee 2', 'I got a new NEW job!', DATE('now'));
INSERT INTO entries(title, body, currentDate) VALUES('You-know-who', 'I ran into you-know-who at the gas station... more to follow', DATE('now'));
COMMIT;