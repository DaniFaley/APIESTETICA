-- crea la base de datos y selecciónala (opcional)
CREATE DATABASE IF NOT EXISTS proyecto_estetica;
USE proyecto_estetica;

-- tabla sexo
CREATE TABLE sexo (
  id_sexo INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- tabla servicio
CREATE TABLE servicio (
  id_servicio INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- tabla corte
CREATE TABLE corte (
  id_corte INT PRIMARY KEY AUTO_INCREMENT,
  nombre_cliente VARCHAR(100) DEFAULT 'Sin nombre',
  fk_id_sexo INT NOT NULL,
  fk_id_servicio INT NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  comentario VARCHAR(100) DEFAULT 'Sin comentario',
  -- foreign keys
  FOREIGN KEY (fk_id_sexo) REFERENCES sexo(id_sexo),
  FOREIGN KEY (fk_id_servicio) REFERENCES servicio(id_servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- tabla datos_usuario
CREATE TABLE datos_usuario (
  id_datos_usuario INT PRIMARY KEY AUTO_INCREMENT,
  primer_nombre VARCHAR(50) NOT NULL,
  segundo_nombre VARCHAR(50),
  primer_apellido VARCHAR(50) NOT NULL,
  segundo_apellido VARCHAR(50),
  calle VARCHAR(100) NOT NULL,
  numero_casa VARCHAR(10) NOT NULL,
  colonia VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  estado VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10) NOT NULL,
  rfc VARCHAR(13) NOT NULL,
  curp VARCHAR(18) NOT NULL,
  telefono VARCHAR(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Tabla roles
CREATE TABLE rol (
  id_rol INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla usuarios
CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  fk_id_rol INT NOT NULL,
  FOREIGN KEY (fk_id_rol) REFERENCES rol(id_rol)
);

-- Inserciones para la tabla rol
INSERT INTO rol (nombre)
VALUES 
('administrador'),
('analista'),
('reportes');

INSERT INTO usuario (correo, contrasena, fk_id_rol) VALUES ('admin@ejemplo.com', '$2b$10$Ex9mCSGFYt4gttg9W.LHyO34xe1taPcApLXTngOE6TO9bcID8hTeu', 1);
INSERT INTO usuario (correo, contrasena, fk_id_rol) VALUES ('analista@ejemplo.com', '$2b$10$pvskpYe2x/nW9Ldsq0p4P.Iy.zJIEJ6Ad1mDDrptQWwntQ5CNYZKK', 2);
INSERT INTO usuario (correo, contrasena, fk_id_rol) VALUES ('reporte@ejemplo.com', '$2b$10$jwvNz2.DFWh8f1qakSYYrexD1WaGQPTH1xzIObRDgkfAWugdYtpAu', 3);


--Insercciones
INSERT INTO sexo (nombre) VALUES ('Femenino');
INSERT INTO sexo (nombre) VALUES ('Masculino');

INSERT INTO servicio (nombre) VALUES ('Corte de cabello');
INSERT INTO servicio (nombre) VALUES ('Tinte');
INSERT INTO servicio (nombre) VALUES ('Peinado');
INSERT INTO servicio (nombre) VALUES ('Tratamiento capilar');

INSERT INTO corte (nombre_cliente, fk_id_sexo, fk_id_servicio, monto, fecha, comentario)
VALUES 
('Ana López', 1, 1, 150.00, '2025-05-04', 'Cliente habitual'),
('Juan Pérez', 2, 2, 300.00, '2025-05-03', 'Primera vez'),
('Alex Rivera', 1, 1, 250.00, '2025-05-02', 'Solicitó cambio de estilo');
