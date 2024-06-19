-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2024 at 08:29 AM
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
('118b7590-2306-11ef-8143-287dfa7042f9', '3fc71278-2bec-11ef-913d-31d7a7bdbd7a'),
('118b7590-2306-11ef-8143-287dfa7042f9', '9adf0a92-2bea-11ef-913d-31d7a7bdbd7a'),
('118b7590-2306-11ef-8143-287dfa7042f9', 'aece892a-2be5-11ef-913d-31d7a7bdbd7a'),
('118b7590-2306-11ef-8143-287dfa7042f9', 'e39d9216-2bec-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', '3fc71278-2bec-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', '7ab028a8-2bf6-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', '9adf0a92-2bea-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', '9be0c398-2bf5-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', '73e96100-2bef-11ef-913d-31d7a7bdbd7a'),
('b5bdd65c-2687-11ef-b608-99a675554b78', 'e39d9216-2bec-11ef-913d-31d7a7bdbd7a');

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
  `password` varchar(36) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
('085c9608-2974-11ef-b357-6d172c966e63', 'Mazal', 'Krispin', 'mazal@gmail.com', '241e9ed380bf66a35c5ecc054d8deffd', 3),
('118b7590-2306-11ef-8143-287dfa7042f9', 'Matan', 'Krispin', 'matan@gmail.com', '241e9ed380bf66a35c5ecc054d8deffd', 2),
('85a59b89-2d47-11ef-899e-d19c9b36397f', 'Orly', 'Krispin', 'orly@walla.co.il', '241e9ed380bf66a35c5ecc054d8deffd', 2),
('b5bdd65c-2687-11ef-b608-99a675554b78', 'Pacs', 'Krispin', 'pacs@gmail.com', '241e9ed380bf66a35c5ecc054d8deffd', 2),
('cd5eb3a7-2d46-11ef-899e-d19c9b36397f', 'Hood', 'Btwash', 'hood@gmail.com', '241e9ed380bf66a35c5ecc054d8deffd', 2);

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
  `description` text NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `startDate`, `endDate`, `price`, `description`, `imageName`) VALUES
('203ce9b0-2bf1-11ef-913d-31d7a7bdbd7a', 'Pai', '2025-02-16', '2025-03-02', 150.00, 'Pai is a charming town nestled in the mountains of northern Thailand. It\'s a popular destination, Thanks to its unique blend of indigenous heritage, captivating scenery, and bohemian vibe.', 'e03e6f38-88dc-4039-821d-279e6ef54979.jpg'),
('28201e79-2be8-11ef-913d-31d7a7bdbd7a', 'Tel-Aviv', '2024-08-27', '2024-08-30', 1500.00, 'Tel Aviv is one of the most vibrant cities in the world. Titled the ‘Mediterranean Capital of Cool’ by the New York Times, this is a 24 hour city with a unique pulse, combining sandy Mediterranean beaches with a world-class nightlife, a buzzing cultural scene, incredible food, UNESCO recognized architecture, and an international outlook.', 'deda8f5b-5555-4e09-9329-73aee4ae8b40.jpg'),
('3fc71278-2bec-11ef-913d-31d7a7bdbd7a', 'Mayrhofen', '2025-02-03', '2025-02-13', 5850.00, 'A traditional Austrian ski resort with lively apres ski and nightlife scene. Additionally, the town offers a variety of summer and winter sports including skiing, hiking, mountain biking and paragliding.', '5317a3cb-fcaf-4a9b-bcc8-a2aa6201d106.jpg'),
('67d0e354-2bf4-11ef-913d-31d7a7bdbd7a', 'Paris', '2024-06-16', '2024-06-21', 1300.00, 'Paris known as the \'City of Love\' and the \'City of Lights\'. This city offers something for everyone, unbelievable food and culture, plus stunning views everywhere you turn.  ', 'b7b95211-76c3-49d5-a338-6e42b99674d3.jpg'),
('73e96100-2bef-11ef-913d-31d7a7bdbd7a', 'Sorrento', '2025-09-29', '2025-10-05', 730.00, 'Ready for trees bearing huge, waxy lemons, ice-cold limoncellos in the sun and patio seats in the speckled shade? Then you’re ready for Sorrento, which looks a little bit like something straight out of a fairytale but is actually real, we tell you. ', 'f7a3f2c9-a8a0-4ed2-9b13-5e88b1eadd84.jpg'),
('7ab028a8-2bf6-11ef-913d-31d7a7bdbd7a', 'Madeira', '2024-06-02', '2024-06-15', 2500.00, 'The island comprises of stunning natural scenery, beautiful wild landscape, glittering waterfalls, dramatic coastline, and high mountains. Madeira is not just the place for the beach lovers, but also for the outdoors enthusiasts and especially for landscape photographers.', '2d5d9246-94a9-439a-b7f3-5d0a3bc3af24.jpg'),
('9adf0a92-2bea-11ef-913d-31d7a7bdbd7a', 'Saranda', '2024-07-03', '2024-07-05', 300.00, 'It\'s time to explore new places in magical Albania. Saranda is a coastal town and popular holiday destination on the Albanian Riviera, known for its unspoiled character and clear blue waters.', '45455736-6b27-49ac-a10a-7ed1978fa1c0.jpg'),
('9be0c398-2bf5-11ef-913d-31d7a7bdbd7a', 'Baku', '2024-06-30', '2024-07-13', 500.00, 'The historical center of Baku reveals its tumultuous past, from its roots as a Silk Road port city, through its oil boom to its Soviet period. The old city is a maze of alleys, mosques, historic buildings and remnants of fortification. Also the city hosts vibrant arts and cultural activities.', 'd17e0bc7-d649-41e3-bb5c-2aea78d3182d.jpg'),
('aece892a-2be5-11ef-913d-31d7a7bdbd7a', 'Sighnaghi', '2024-06-24', '2024-06-30', 600.00, 'Its time to take your beloved one to a romantic vacation in Sighnaghi, the Georgian town, located in Kakheti region, Georgia, that known as the City of Love. Its also known as a wine-producing region with a great cuisine.', '0071a0f0-e7a4-4d1b-83a8-5367df014c4c.jpg'),
('b8f9f1bf-2be6-11ef-913d-31d7a7bdbd7a', 'Jerusalem ', '2024-10-05', '2024-10-09', 850.00, 'Jerusalem has an unique blend of history, culture, and spirituality, and it makes her a truly unforgettable destination for travelers to Israel.  The Old City of Jerusalem is a UNESCO World Heritage Site, with its four distinct quarters – Jewish, Christian, Muslim, and Armenian – each offering a unique glimpse into the city’s rich history and diversity. ', '7a761ab5-30d6-4ded-8f3b-dce4bf3a7180.jpg'),
('ce9650cb-2be9-11ef-913d-31d7a7bdbd7a', 'Eilat', '2024-07-21', '2024-07-27', 10000.00, 'Eilat is a city based around tourism, with fun activities for everyone. Spend your time sunbathing, diving or hiking nature trails. The city sees less than ten days of rain a year – so you’re practically guaranteed some sunshine regardless of the season.', 'cf69c611-2eb1-4d5f-9fe6-4e1aaed14c84.jpeg'),
('e39d9216-2bec-11ef-913d-31d7a7bdbd7a', 'Dead Sea', '2024-06-24', '2024-06-26', 689.00, 'The Dead Sea is known in Hebrew as the \'Sea of Salt\'. The Dead Sea elevation stands at -430 m, making it the lowest point on earth. It’s surrounded by the stunning landscape of the Negev Desert. The salty water and its associated mud are renowned for their health and healing properties.', '8759f66d-0a39-41d8-95fb-21a3d664e95e.jpg');

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
  ADD UNIQUE KEY `idx_email_unique` (`email`),
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
