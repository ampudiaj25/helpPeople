-- Creacion de las tablas
Create Table TiposDocumentos(
id int PRIMARY KEY IDENTITY(1,1),
nombre Varchar(100) not null
);

Create table Ciudadanos(
id int PRIMARY KEY IDENTITY(1,1),
tiposDocumento int not null,
cedula Varchar(50) not null,
nombres Varchar(100) not null,
apellidos Varchar(100) not null,
fechaNacimiento Date not null,
profesion Varchar(100) not null,
aspiracionSalarial Decimal (18,2),
correoElectronico Varchar(100),
FOREIGN KEY (tiposDocumento) REFERENCES TiposDocumentos(id)
);