-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2024 at 09:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` varchar(36) NOT NULL,
  `vacationId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('7241aaf3-1fec-11ef-9a1b-9323f668247f', 'fbe418c2-1fe7-11ef-9a1b-9323f668247f'),
('ee1b38d3-2004-11ef-9a1b-9323f668247f', 'fbe418c2-1fe7-11ef-9a1b-9323f668247f'),
('ee1b38d3-2004-11ef-9a1b-9323f668247f', 'cf9e21b5-2004-11ef-9a1b-9323f668247f');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'guest'),
(2, 'user'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(6) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
('7241aaf3-1fec-11ef-9a1b-9323f668247f', 'Mazal', 'Krispin', 'mazalkrispin@gmail.com', '123456', 3),
('ee1b38d3-2004-11ef-9a1b-9323f668247f', 'Hood', 'Btwash', 'hood@walla.co.il', '123456', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `destination` varchar(510) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `startDate`, `endDate`, `price`, `description`, `imageName`) VALUES
('4e430044-201c-11ef-9a1b-9323f668247f', 'Singapure', '2024-06-25', '2024-06-27', 1000.00, 'you cant throw gummies', 'gum'),
('67989cd7-200a-11ef-9a1b-9323f668247f', 'israel', '2024-05-01', '2024-05-04', 100.00, 'boei lepo', 'israel'),
('a9773d1e-200c-11ef-9a1b-9323f668247f', 'kiryat bialik', '2024-05-31', '2024-06-08', 0.00, 'our home', 'home'),
('ced45f82-200c-11ef-9a1b-9323f668247f', 'haifa', '2024-06-01', '2024-06-03', 10.00, 'eat shawarma', 'bahaim'),
('cf9e21b5-2004-11ef-9a1b-9323f668247f', 'Signagi', '2024-07-25', '2024-07-27', 200.00, 'Its time to take your beloved one to a romantic vacation in Signagi, the Georgian town, that known as the City of Love. Its also known as a wine-producing region with great cuisine.', 'signagi'),
('fbe418c2-1fe7-11ef-9a1b-9323f668247f', 'Saranda', '2024-06-02', '2024-06-08', 539.99, 'It\'s time to explore new places in magical Albania .Saranda is a coastal town and popular holiday destination on the Albanian Riviera, known for its unspoiled character and clear blue waters.', 'saranda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
