-- SCRIPT DE POBLAMIENTO PARA LA PRESENTACIÓN DE LA BIBLIOTECA
-- Instrucciones: Pega todo este código en la pestaña "SQL" de phpMyAdmin y dale a "Continuar".

-- 1. Categorías
INSERT INTO categoria (nombre, descripcion) VALUES
('Ciencia Ficción', 'Libros sobre futuros distópicos, tecnología y el espacio'),
('Fantasía', 'Magia, criaturas míticas y mundos imaginarios'),
('Terror y Suspenso', 'Historias diseñadas para asustar y causar suspenso'),
('Tecnología', 'Programación, informática y ciencias aplicadas'),
('Historia y Biografías', 'Hechos históricos y vidas de personajes ilustres');

-- 2. Autores
INSERT INTO autor (nombre, apellido, nacionalidad) VALUES
('Gabriel', 'García Márquez', 'Colombiana'),
('J.K.', 'Rowling', 'Británica'),
('Stephen', 'King', 'Estadounidense'),
('Isaac', 'Asimov', 'Rusa'),
('Isabel', 'Allende', 'Chilena');

-- 3. Libros
-- Nota: Asumimos que los IDs de los autores y categorías anteriores se generan del 1 al 5.
INSERT INTO libro (titulo, isbn, editorial, anio_publicacion, cantidad_ejemplares, disponible, autor_id, categoria_id) VALUES
('Cien Años de Soledad', '978-84-376-0494-7', 'Sudamericana', 1967, 10, true, 1, 2),
('Harry Potter y la Piedra Filosofal', '978-84-7888-445-2', 'Salamandra', 1997, 15, true, 2, 2),
('El Resplandor', '978-84-9759-380-4', 'DeBolsillo', 1977, 5, true, 3, 3),
('Fundación', '978-84-9889-090-2', 'Alamut', 1951, 8, true, 4, 1),
('La Casa de los Espíritus', '978-84-01-38204-6', 'Plaza & Janés', 1982, 12, true, 5, 2),
('Yo, Robot', '978-84-350-0105-2', 'Edhasa', 1950, 7, true, 4, 1),
('It (Eso)', '978-84-9759-379-8', 'DeBolsillo', 1986, 4, true, 3, 3);

-- 4. Usuarios (Lectores Estudiantes)
INSERT INTO usuario (documento, nombre, apellido, correo, telefono) VALUES
('100100100', 'Carlos', 'Ramírez', 'carlos.r@gmail.com', '3001234567'),
('200200200', 'María', 'Gómez', 'maria.gomez@hotmail.com', '3109876543'),
('300300300', 'Luis', 'Fernández', 'luisf@yahoo.com', '3156667777'),
('400400400', 'Ana', 'Martínez', 'ana.m@correo.com', '3205558899');

-- 5. Empleados (Operadores extras para la presentación)
INSERT INTO empleado (nombre, correo, contrasena, rol) VALUES 
('Operador Turno Mañana', 'operador1@biblioteca.com', '123456', 'OPERADOR'),
('Operador Turno Tarde', 'operador2@biblioteca.com', '123456', 'OPERADOR');
