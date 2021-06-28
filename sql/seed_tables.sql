-- //seed table


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwords VARCHAR(64) NOT NULL,
  user_address VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Tom', 'Hanks', 't.hanks@hanks.com', '!THanks1', '123 Hollywood St, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Denzel', 'Washington', 'd.washington@washington.com', '!DWash1', '182 Hollywood St, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Harrison', 'Ford', 'h.ford@ford.com', '!HFord1', '122 Celebrity Dr, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Harrison', 'Ford', 'h.ford@ford.com', '!HFord1', '112 Movie Ct, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Sandra', 'Bullock', 's.bullock@bullock.com', '!THanks1', '139 Celebrity Dr, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Jennifer', 'Lawrence', 'j.lawrence@lawrence.com', '!JLware1', '90 Movie Ct, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Brad', 'Pitt', 'b.pitt@pitt.com', '!BPitt1', '112 Fame Av, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Samuel', 'Jackson', 's.jackson@jackson.com', '!SJack1', '112 Fame Av, Hollywood';
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Meryl', 'Streep', 's.meryl@meryl.com', '!MStree1', '34 Fame Av, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Cate', 'Blanchett', 'c.blamchett@blamchett.com', '!CBlan1', '156 Rich dr, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Seth', 'Rogen', 's.rogen@rogen.com', '!SRoge1', '11 Rich dr, Hollywood');
INSERT INTO users (firstname, surname, email, passwords, user_address)
VALUES ('Antonio', 'Banderas', 'a.banderas@banderas.com', '!ABard1', '71 Rich dr, Hollywood');


