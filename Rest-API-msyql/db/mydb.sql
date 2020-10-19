-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-10-2020 a las 21:04:46
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demandante`
--

CREATE TABLE `demandante` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `photoURL` varchar(500) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `demandante`
--

INSERT INTO `demandante` (`id`, `name`, `email`, `password`, `photoURL`, `direccion`, `telefono`) VALUES
(1, 'Cristobal Mancilla', 'a@a.com', 'qwerty', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/BD805B40-2494-44FB-8EAF-58B2179C744E.jpg', 'pastene 1515', 985418251),
(2, 'pedro altamira', 'alguien@gmail.com', 'qwerty', '', '', 0),
(3, 'Felipe', 'Felipe@gmail.com', 'qwerty', '', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha`
--

CREATE TABLE `fecha` (
  `id` int(11) NOT NULL,
  `ano_mes_dia` varchar(45) NOT NULL,
  `oferente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `fecha`
--

INSERT INTO `fecha` (`id`, `ano_mes_dia`, `oferente_id`) VALUES
(1, '2020-09-14', 1),
(2, '2020-09-21', 1),
(3, '2020-09-29', 1),
(4, '2020-10-15', 1),
(5, '2020-10-08', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosprofesion`
--

CREATE TABLE `fotosprofesion` (
  `fotosProfesion` varchar(500) NOT NULL,
  `oferente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas`
--

CREATE TABLE `horas` (
  `idhoras` int(11) NOT NULL,
  `horas` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horas`
--

INSERT INTO `horas` (`idhoras`, `horas`) VALUES
(1, '08:00 - 09:00'),
(2, '09:00 - 10:00'),
(3, '10:00 - 11:00'),
(4, '11:00 - 12:00'),
(5, '12:00 - 13:00'),
(6, '13:00 - 14:00'),
(7, '14:00 - 15:00'),
(8, '15:00 - 16:00'),
(9, '16:00 - 17:00'),
(10, '17:00 - 18:00'),
(11, '18:00 - 19:00'),
(12, '19:00 - 20:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_has_fecha`
--

CREATE TABLE `horas_has_fecha` (
  `horas_idhoras` int(11) NOT NULL,
  `fecha_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horas_has_fecha`
--

INSERT INTO `horas_has_fecha` (`horas_idhoras`, `fecha_id`) VALUES
(2, 5),
(4, 5),
(8, 4),
(8, 5),
(9, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferente`
--

CREATE TABLE `oferente` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `profesion` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `photoURL` varchar(500) NOT NULL,
  `rut` varchar(45) NOT NULL,
  `photosServicio` varchar(500) NOT NULL,
  `telefono` int(20) NOT NULL,
  `puntuacion` int(10) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `honorarios` int(11) NOT NULL,
  `prevision` varchar(45) NOT NULL,
  `estudios` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `oferente`
--

INSERT INTO `oferente` (`id`, `name`, `email`, `password`, `profesion`, `direccion`, `photoURL`, `rut`, `photosServicio`, `telefono`, `puntuacion`, `descripcion`, `honorarios`, `prevision`, `estudios`) VALUES
(1, 'Gilbert Blythe', 'gilbert@gmail.com', 'qwerty', 'Kinesiologo', 'bajando el hospital 5, dept 105', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/48F20C58-E517-4793-A279-0F85114B5FC8.jpg', '7872678-8', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/6601A3D7-C6BF-4403-9E7A-84EB097072F2.jpg', 985418251, 3, '10 años de experciencia en Kinesiterapia Respiratoria y Cardiovascular. Tengo 46 años con especializacion en Neurokinesiología, y blablablabla ', 20000, 'Fonasa', 'Universidad Catolica de Chile. Doctorado en ciencias de no se que'),
(2, 'Cristobal Mancilla', 'cristobal@gmail.com', 'qwerty', 'Kinesiologo', 'calle 234, osorno', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/EFD6D1BF-ED89-4327-B883-0049376416FC.png', '8874518-3', '', 978675432, 4, 'Atencion adultosm mayores, centro medico en medisur', 45000, 'ISAPRE MASVIDA', ''),
(6, 'Cesar Gonzalez', 'cesar@@gmail.com', 'qwerty', 'Kinesiologo', 'cumbre 345, Valparaiso, Chile', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/451DCEEF-22A4-4947-933A-D9C0C4ED5F55.jpg', '7872678-8', '', 985418251, 4, '', 0, '', ''),
(7, 'Camilo Nicolas Perez', 'camilo@gmail.com', 'qwerty', 'Kinesiologo', 'paula jaraquemada 243, Valparaiso', 'file:///var/mobile/Containers/Data/Application/6F0ECAC8-BC10-47A6-A5C9-2B29F1312CDA/Library/Caches/ExponentExperienceData/%2540anonymous%252FmyNewProject-da1a8e08-f5bb-43b9-bb6e-f0d7e5e01033/ImagePicker/9520660E-D818-472D-876B-B64CC7FED344.jpg', '7872678-8', '', 0, 0, '', 0, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitud` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(10) NOT NULL,
  `demandante_id` int(11) NOT NULL,
  `oferente_id` int(11) NOT NULL,
  `visible` tinyint(2) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `horario` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idSolicitud`, `fecha`, `estado`, `demandante_id`, `oferente_id`, `visible`, `direccion`, `horario`) VALUES
(42, '2020-09-29', 3, 1, 1, 1, 'Lord Cochrane 1290-1196, Osorno, Los Lagos, C', '13:00 - 14:00'),
(43, '2020-10-15', 1, 1, 1, 1, 'Arturo Prat 762, Osorno, Los Lagos, Chile', '15:00 - 16:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `demandante`
--
ALTER TABLE `demandante`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fecha`
--
ALTER TABLE `fecha`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fecha_oferente1_idx` (`oferente_id`);

--
-- Indices de la tabla `fotosprofesion`
--
ALTER TABLE `fotosprofesion`
  ADD PRIMARY KEY (`fotosProfesion`),
  ADD KEY `fk_fotosProfesion_oferente1_idx` (`oferente_id`);

--
-- Indices de la tabla `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`idhoras`);

--
-- Indices de la tabla `horas_has_fecha`
--
ALTER TABLE `horas_has_fecha`
  ADD PRIMARY KEY (`horas_idhoras`,`fecha_id`),
  ADD KEY `fk_horas_has_fecha_fecha1_idx` (`fecha_id`),
  ADD KEY `fk_horas_has_fecha_horas1_idx` (`horas_idhoras`);

--
-- Indices de la tabla `oferente`
--
ALTER TABLE `oferente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idSolicitud`),
  ADD KEY `fk_Solicitud_demandante1_idx` (`demandante_id`),
  ADD KEY `fk_Solicitud_oferente1_idx` (`oferente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `demandante`
--
ALTER TABLE `demandante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `fecha`
--
ALTER TABLE `fecha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `oferente`
--
ALTER TABLE `oferente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fecha`
--
ALTER TABLE `fecha`
  ADD CONSTRAINT `fk_fecha_oferente1` FOREIGN KEY (`oferente_id`) REFERENCES `oferente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `fotosprofesion`
--
ALTER TABLE `fotosprofesion`
  ADD CONSTRAINT `fk_fotosProfesion_oferente1` FOREIGN KEY (`oferente_id`) REFERENCES `oferente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `horas_has_fecha`
--
ALTER TABLE `horas_has_fecha`
  ADD CONSTRAINT `fk_horas_has_fecha_fecha1` FOREIGN KEY (`fecha_id`) REFERENCES `fecha` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_horas_has_fecha_horas1` FOREIGN KEY (`horas_idhoras`) REFERENCES `horas` (`idhoras`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `fk_Solicitud_demandante1` FOREIGN KEY (`demandante_id`) REFERENCES `demandante` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Solicitud_oferente1` FOREIGN KEY (`oferente_id`) REFERENCES `oferente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
