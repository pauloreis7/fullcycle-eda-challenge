CREATE TABLE IF NOT EXISTS clients (
  id varchar(255) not null primary key,
  name varchar(255),
  email varchar(255),
  created_at timestamp default now()
);
 
CREATE TABLE IF NOT EXISTS accounts (
  id varchar(255) not null primary key,
  client_id varchar(255) not null,
  balance DOUBLE PRECISION,
  created_at timestamp default now(),
  FOREIGN KEY (client_id) REFERENCES clients (id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id varchar(255) not null primary key,
  account_id_from varchar(255) not null,
  account_id_to varchar(255) not null,
  amount DOUBLE PRECISION,
  created_at timestamp default now()
);

INSERT INTO clients (id, name, email) VALUES 
  ('dc70ab34-3dc0-47fc-89fe-bb40766a0eb7', 'John Doe', "johndoe@gmail.com"),
  ('c7017ce6-7cb3-44e1-9774-97da3743cb5d', 'Jane Doe', "janedoe@gmail.com");

INSERT INTO accounts (id, client_id, balance) VALUES 
  ('f8df753c-3b58-43aa-8016-12aaa4f1ea3e', 'dc70ab34-3dc0-47fc-89fe-bb40766a0eb7', 100),
  ('0216ea38-524f-4e85-8743-d484a8f7538e', 'c7017ce6-7cb3-44e1-9774-97da3743cb5d', 100);