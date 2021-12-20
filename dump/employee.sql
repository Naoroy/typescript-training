CREATE TABLE Team (
    Id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    Name    TEXT NOT NULL UNIQUE
);
CREATE TABLE Employee (
    Id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    FirstName   TEXT NOT NULL,
    LastName    TEXT NOT NULL,
    Email       TEXT NOT NULL UNIQUE,
    TeamId      INTEGER NULL,
    FOREIGN KEY(TeamId) REFERENCES Team(Id)
);

INSERT INTO Team(Name) values('Marketing');
INSERT INTO Team(Name) values('Sales');
INSERT INTO Team(Name) values('Engineering');
INSERT INTO Team(Name) values('Executive');

INSERT INTO Employee
(
    FirstName,
    LastName,
    Email,
    TeamId 
)
values
(
    'Thomas',
    'Anderson',
    'thomas.anderson@typescript.com',
    (Select Id From Team where Name = 'Executive')
);
