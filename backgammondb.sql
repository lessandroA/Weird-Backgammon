-- Progettazione Web 
DROP DATABASE if exists backgammondb; 
CREATE DATABASE backgammondb; 
USE backgammondb; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: backgammondb
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partite`
--

DROP TABLE IF EXISTS `partite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player1` varchar(30) NOT NULL,
  `player2` varchar(30) NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  `winner` varchar(30) DEFAULT NULL,
  `tstamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partite`
--

LOCK TABLES `partite` WRITE;
/*!40000 ALTER TABLE `partite` DISABLE KEYS */;
/*!40000 ALTER TABLE `partite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statopartita`
--

DROP TABLE IF EXISTS `statopartita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statopartita` (
  `gameID` int(11) NOT NULL,
  `turn` varchar(6) CHARACTER SET utf16 NOT NULL DEFAULT 'red',
  `turnNumber` int(11) NOT NULL DEFAULT '1',
  `outRed` int(11) NOT NULL DEFAULT '0',
  `outBlack` int(11) NOT NULL DEFAULT '0',
  `pawn1` int(11) DEFAULT '2',
  `color1` varchar(6) DEFAULT 'red',
  `pawn2` int(11) DEFAULT NULL,
  `color2` varchar(6) DEFAULT NULL,
  `pawn3` int(11) DEFAULT NULL,
  `color3` varchar(6) DEFAULT NULL,
  `pawn4` int(11) DEFAULT NULL,
  `color4` varchar(6) DEFAULT NULL,
  `pawn5` int(11) DEFAULT NULL,
  `color5` varchar(6) DEFAULT NULL,
  `pawn6` int(11) DEFAULT '5',
  `color6` varchar(6) DEFAULT 'black',
  `pawn7` int(11) DEFAULT NULL,
  `color7` varchar(6) DEFAULT NULL,
  `pawn8` int(11) DEFAULT '3',
  `color8` varchar(6) DEFAULT 'black',
  `pawn9` int(11) DEFAULT NULL,
  `color9` varchar(6) DEFAULT NULL,
  `pawn10` int(11) DEFAULT NULL,
  `color10` varchar(6) DEFAULT NULL,
  `pawn11` int(11) DEFAULT NULL,
  `color11` varchar(6) DEFAULT NULL,
  `pawn12` int(11) DEFAULT '5',
  `color12` varchar(6) DEFAULT 'red',
  `pawn13` int(11) DEFAULT '5',
  `color13` varchar(6) DEFAULT 'black',
  `pawn14` int(11) DEFAULT NULL,
  `color14` varchar(6) DEFAULT NULL,
  `pawn15` int(11) DEFAULT NULL,
  `color15` varchar(6) DEFAULT NULL,
  `pawn16` int(11) DEFAULT NULL,
  `color16` varchar(6) DEFAULT NULL,
  `pawn17` int(11) DEFAULT '3',
  `color17` varchar(6) DEFAULT 'red',
  `pawn18` int(11) DEFAULT NULL,
  `color18` varchar(6) DEFAULT NULL,
  `pawn19` int(11) DEFAULT '5',
  `color19` varchar(6) DEFAULT 'red',
  `pawn20` int(11) DEFAULT NULL,
  `color20` varchar(6) DEFAULT NULL,
  `pawn21` int(11) DEFAULT NULL,
  `color21` varchar(6) DEFAULT NULL,
  `pawn22` int(11) DEFAULT NULL,
  `color22` varchar(6) DEFAULT NULL,
  `pawn23` int(11) DEFAULT NULL,
  `color23` varchar(6) DEFAULT NULL,
  `pawn24` int(11) DEFAULT '2',
  `color24` varchar(6) DEFAULT 'black',
  `hasEatenBlack` tinyint(1) NOT NULL DEFAULT '0',
  `hasEatenRed` tinyint(1) NOT NULL DEFAULT '0',
  `eatenBlackNumber` int(11) NOT NULL DEFAULT '0',
  `eatenRedNumber` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statopartita`
--

LOCK TABLES `statopartita` WRITE;
/*!40000 ALTER TABLE `statopartita` DISABLE KEYS */;
/*!40000 ALTER TABLE `statopartita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `partite_giocate` int(11) NOT NULL DEFAULT '0',
  `partite_vinte` int(11) NOT NULL DEFAULT '0',
  `partite_perse` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-24 15:28:57
