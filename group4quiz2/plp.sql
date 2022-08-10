-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2022 at 03:41 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plp`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1, '', 'briankigame7@gmail.com', '$2y$10$BFN6OIbqj6FoaBkz2R22P.5Yfz7bCDR0fBg5mpL/IUdsBb7M7buw2'),
(2, '', 'briankigame7@gmail.com', '$2y$10$NKfcESm55yNrukEshlfYvexpD7OlFHdJ.As5p3poSJFYYCfsnXJ5y'),
(3, '', 'briankigame7@gmail.com', '$2y$10$ycsHC30Vk2ONbpk9Z0YBO.zK3npzSFdGVfJVfooZ3J04APbXP/M7O'),
(4, 'briankigame7@gmail.com', 'briankigame7@gmail.com', '$2y$10$yF2.4/wMjfbRxGon85StzOzP63trnQRi5I1jyahbTbHs7aNd1Mfca'),
(5, 'briankigame7@gmail.com', 'briankigame7@gmail.com', '$2y$10$oYhLUeH1NOlA4k/qUdnbeeCVkXugNE7JicBaEem0dqYWLjvxt92zq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
