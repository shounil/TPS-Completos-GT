--CREATE DATABASE Pokemon
--go
--use Pokemon
--go

--tipos de datos numeros
--INT //enteros
--decimal (10.4
--float

--texto
--char texto fijo siempre guarda 3 caracteres
--varchat texto variable
--TEXT no se usa mas
--varchar(MAX) 

--fechas y tiempos
--DATE solo fecha (2025-08-18) YYYY-MM-DD
--DATETIME toda la fecha completa (2025-08-18 04:35:00) YYYY-MM-DD HH-MM-SS
--TIME SOLO HORA HH-MM-SS

--BIT (Booleano)
--0 FALSE
--1 TRUE

--CREATE TABLE Pokemons (
--//identificador unico
--//nombre
--//tipo
--//fecha de captura
--//es legendario
--//Nivel
--)

--nombre, tipo, primary/folean key
CREATE TABLE Pokemons(
id INT PRIMARY KEY,
Nombre VARCHAR(50),
Tipo VARCHAR(50),
FechaCaptura DATE,
EsLegendario BIT,
Nivel INT
)
SELECT * FROM dbo.Pokemons

--manipulacion de datos

INSERT INTO Pokemons (iD, Nombre, Tipo, FechaCaptura, EsLegendario, Nivel)
VALUES(1, 'Pikachu', 'Electrico', '2025-08-18', 0, 25)

INSERT INTO Pokemons (iD, Nombre, Tipo, FechaCaptura, EsLegendario, Nivel)
VALUES(2, 'Greninja', 'Acuatico', '2025-08-20', 0, 100)
