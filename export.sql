-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              11.2.2-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database e-go
CREATE DATABASE IF NOT EXISTS `e-go` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `e-go`;

-- Dump della struttura di tabella e-go.points
CREATE TABLE IF NOT EXISTS `points` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `points` int(11) NOT NULL DEFAULT 0,
  `userEmail` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_points_users` (`userEmail`),
  CONSTRAINT `FK_points_users` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella e-go.points: ~0 rows (circa)

-- Dump della struttura di tabella e-go.route
CREATE TABLE IF NOT EXISTS `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startCoordinates` point NOT NULL,
  `startTime` datetime NOT NULL,
  `endCoordinates` point DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `userEmail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_route_users` (`userEmail`),
  CONSTRAINT `FK_route_users` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella e-go.route: ~0 rows (circa)

-- Dump della struttura di tabella e-go.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella e-go.settings: ~0 rows (circa)

-- Dump della struttura di tabella e-go.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `registrationDate` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella e-go.users: ~0 rows (circa)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
