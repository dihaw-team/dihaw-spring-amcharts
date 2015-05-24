-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--

--
-- Base de données: `dihaw_amcharts`
--

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

CREATE TABLE IF NOT EXISTS `statistiques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `value` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `statistiques`
--

INSERT INTO `statistiques` (`id`, `date`, `value`) VALUES
(1, '2014-03-01 12:00:00', 321),
(2, '2014-03-02 12:00:00', 3698),
(3, '2014-03-03 00:00:00', 2321),
(4, '2014-03-04 00:00:00', 398),
(5, '2014-02-02 00:00:02', 321),
(6, '2014-02-03 00:00:00', 348),
(7, '2013-12-02 00:00:00', 321),
(8, '2013-12-03 00:00:00', 348),
(9, '2013-12-01 00:00:00', 5321),
(10, '2013-12-02 00:00:00', 648);

