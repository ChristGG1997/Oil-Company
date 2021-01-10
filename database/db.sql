DROP DATABASE proyecto_u;

CREATE DATABASE proyecto_u;

USE proyecto_u;

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(90) NOT NULL,
    cedula INT(11) NOT NULL,
    names VARCHAR(30) NOT NULL,
    lastnames VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    celular INT(11) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE UserAdmin (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fullname VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO UserAdmin (username, password, fullname)
    VALUES ('admin', 'f74df747f', 'Christian Iglesias');


CREATE TABLE Empresas_Extranjeras (
    id INT NOT NULL AUTO_INCREMENT,
    codigo_empresa INT(11) NOT NULL,
    nombre_empresa VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE Pedido (
    id INT NOT NULL AUTO_INCREMENT,
    codigo_pedido INT(11) NOT NULL,
    cantidad_articulo INT(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Articulo (
    id INT NOT NULL AUTO_INCREMENT,
    codigo_articulo INT(11) NOT NULL,
    nombre_articulo VARCHAR(30),
    peso INT(11),
    PRIMARY KEY (id)
);

CREATE TABLE Vuelo(
    id INT NOT NULL AUTO_INCREMENT,
    codigo_vuelo INT(11),
    fecha_salida DATE,
    fecha_llegada DATE,
    PRIMARY KEY (id)
);

CREATE TABLE Clientes (
    id INT NOT NULL AUTO_INCREMENT,
    codigo_empresa_cliente INT(11) NOT NULL,
    nombre_empresa_cliente VARCHAR(30),
    fecha_envio DATE,
    fecha_recibido DATE,
    tipo_envio VARCHAR(30),
    PRIMARY KEY (id)
);

ALTER TABLE Empresas_Extranjeras
  ADD CONSTRAINT Empresas_Extranjerasuno
  FOREIGN KEY Empresas_Extranjeras( codigo_pedido )
  REFERENCES Pedido( codigo_pedido );

ALTER TABLE Empresas_Extranjeras
  ADD CONSTRAINT Empresas_Extranjerasdos
  FOREIGN KEY Empresas_Extranjeras( codigo_vuelo )
  REFERENCES Vuelo( codigo_vuelo );

ALTER TABLE Pedido
  ADD CONSTRAINT Pedidouno
  FOREIGN KEY Pedido( codigo_articulo )
  REFERENCES Articulo( codigo_articulo );

SHOW TABLES;