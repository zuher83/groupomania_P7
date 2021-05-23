-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.5.9-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage de la structure de la table groupomania3. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_relation_comment` (`user_id`) USING BTREE,
  KEY `post_relation_comment` (`post_id`) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.comments : ~0 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`comment_id`, `comment`, `post_id`, `user_id`, `create_date`) VALUES
	(1, 'Totam aut adipisicing? Ducimus sapien neque suspendisse hac delectus ipsum quis fuga tristique culpa, congue magnis', 1, 3, '2021-05-23 14:04:44'),
	(2, 'Placeat.Vel vel, lectus provident modi ornare, semper laudantium fusce nostrum?', 1, 4, '2021-05-23 14:07:45'),
	(3, 'Totam aut adipisicing?', 2, 4, '2021-05-23 14:07:55'),
	(4, 'Sed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio', 2, 5, '2021-05-23 14:11:16'),
	(5, 'Sed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio', 3, 5, '2021-05-23 14:11:23'),
	(6, 'Sed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio', 1, 5, '2021-05-23 14:11:30');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. follow_user
CREATE TABLE IF NOT EXISTS `follow_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`user_id`,`follower_id`) USING BTREE,
  KEY `user_relation_follow` (`follower_id`) USING BTREE,
  KEY `user_relation_followed` (`user_id`),
  CONSTRAINT `follow_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_user_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.follow_user : ~0 rows (environ)
/*!40000 ALTER TABLE `follow_user` DISABLE KEYS */;
INSERT INTO `follow_user` (`id`, `user_id`, `follower_id`) VALUES
	(2, 1, 3),
	(1, 2, 3),
	(4, 2, 4),
	(5, 2, 5),
	(3, 3, 4);
/*!40000 ALTER TABLE `follow_user` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `like_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `liket_time` datetime NOT NULL,
  PRIMARY KEY (`like_id`),
  KEY `user_relation_like` (`like_by`) USING BTREE,
  KEY `post_relation_like` (`post_id`) USING BTREE,
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`like_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.likes : ~0 rows (environ)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` (`like_id`, `like_by`, `post_id`, `liket_time`) VALUES
	(1, 3, 1, '2021-05-23 14:04:27'),
	(2, 4, 1, '2021-05-23 14:07:46'),
	(3, 4, 2, '2021-05-23 14:07:48'),
	(4, 5, 2, '2021-05-23 14:11:18'),
	(5, 5, 3, '2021-05-23 14:11:25'),
	(6, 5, 1, '2021-05-23 14:11:31');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `author` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_created` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `post_id` (`post_id`) USING BTREE,
  KEY `author_relation` (`author`),
  CONSTRAINT `author_relation` FOREIGN KEY (`author`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.posts : ~0 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`post_id`, `author`, `title`, `content`, `post_created`, `image`) VALUES
	(1, 2, 'Hello je me présente', 'Vel vel, lectus provident modi ornare, semper laudantium fusce nostrum? Accusantium alias? Consectetuer ante magni scelerisque diamlorem cursus debitis labore? Magni saepe enim quos. Placeat.Vel vel, lectus provident modi ornare, semper laudantium fusce nostrum? Accusantium alias? Consectetuer ante magni scelerisque diamlorem cursus debitis labore? Magni saepe enim quos. Placeat.', '2021-05-23 14:01:05', NULL),
	(2, 3, 'Ducimus sapien neque suspendisse hac delectus', 'Perferendis nascetur consectetur suscipit phasellus suspendisse recusandae, magnis voluptatum lacus necessitatibus nam, eu tincidunt, fugiat suspendisse duis porro assumenda torquent.\r\n\r\nTotam aut adipisicing? Ducimus sapien neque suspendisse hac delectus ipsum quis fuga tristique culpa, congue magnis, adipiscing sed lectus montes.', '2021-05-23 14:04:21', 'e5f019d9-0ab7-43b8-a529-8332238b742bthought-catalog-wyeindrv88i-unsplash.jpg.jpg'),
	(3, 4, 'Pellentesque ut lectus', 'Praesent tincidunt varius lorem nec luctus. Vivamus laoreet nec lacus a efficitur. Praesent quis pretium lorem. Vivamus semper ultricies diam vitae efficitur. Pellentesque ut lectus bibendum neque mattis pellentesque. Pellentesque vitae condimentum purus, at rhoncus turpis. ', '2021-05-23 14:07:31', NULL),
	(4, 5, ' Vestibulum purus odio', '\r\nSed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio, vulputate eu ex vel, sagittis cursus felis. Vestibulum justo libero, facilisis sed fermentum sit amet, consequat ornare risus. Integer non ipsum iaculis, dictum diam quis, mollis metus.\r\nSed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio, vulputate eu ex vel, sagittis cursus felis. Vestibulum justo libero, facilisis sed fermentum sit amet, consequat ornare risus. Integer non ipsum iaculis, dictum diam quis, mollis metus.', '2021-05-23 14:11:01', '37602a0e-3aa6-4b96-8cd6-471cc524bf9erizki-dwi-yd1wwwilf4o-unsplash.jpg.jpg');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.roles : ~3 rows (environ)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'User'),
	(2, 'Moderator'),
	(3, 'Admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `joined` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `work_department` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.users : ~1 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `last_name`, `email`, `password`, `joined`, `image`, `cover_image`, `work_department`, `bio`, `birth_date`) VALUES
	(1, 'Admin', 'Groupomania', 'admin@groupomania.com', '$2a$08$qiKFNfWM7R0v9GWjaA7mx.pWGgFPlG79xQAPGcRS0MeHeeivVWDNi', '2021-05-07 10:09:33', '', NULL, 'Administrateur Informatique', 'Informaticien chez Groupomania depuis 5 ans, je m\'occupe du développement du numérique', '1985-05-07'),
	(2, 'Dupont', 'Jean', 'jean@groupomania.com', '$2a$08$T/JHL45.Hrk.VC/q7dbdUOiyiQtJqfIbriBpjooAZ0g2/P7yV45M2', '2021-05-23 13:59:22', 'cab57608-a192-4dd1-aabc-70cfe25a117falex-iby-xhmsz5i1kn8-unsplash.jpg.jpg', NULL, 'Comptabilité', 'Vel vel, lectus provident modi ornare, semper laudantium fusce nostrum? Accusantium alias? Consectetuer ante magni scelerisque diamlorem cursus debitis labore? Magni saepe enim quos. Placeat.', '1989-05-20'),
	(3, 'Martin', 'Julie', 'julie@groupomania.com', '$2a$08$gFTRUJAa7G/vwYmRr3VYlu0L70azvW4yYMdlpRr15K3fB2RfQiO62', '2021-05-23 14:02:22', 'f0e61e2a-c6a7-421e-8c97-1aa821bdbd9echristopher-campbell-rdeovte7vos-unsplash.jpg.jpg', NULL, 'Ressources humaines', 'Accusantium alias? Consectetuer ante magni scelerisque diamlorem cursus debitis labore? Magni saepe enim quos', '1987-12-09'),
	(4, 'Blanc', 'Sandy', 'sandy@groupomania.com', '$2a$08$gvFBKbD5OJucbMsYcUJy3eOiJ4Bck.ZO8qVVuHqADuKHOIllqI.22', '2021-05-23 14:05:48', '508344dd-1328-48b5-b520-5594f85f3bd3michael-dam-mez3pofgs_k-unsplash.jpg.jpg', NULL, 'Gestion des achats', '\nPraesent tincidunt varius lorem nec luctus. Vivamus laoreet nec lacus a efficitur. Praesent quis pretium lorem. Vivamus semper ultricies diam vitae efficitur. Pellentesque ut lectus bibendum neque mattis pellentesque. Pellentesque vitae condimentum purus, at rhoncus turpis. ', '1984-12-03'),
	(5, 'Moulard', 'Patrick', 'patrick@groupomania.com', '$2a$08$rXBZUV1XFhZ09q5ice3Pz.pbWxF0C9EfG10kafDrCFU3i76XZaTl6', '2021-05-23 14:09:19', '666959fe-f4f8-4310-a197-54bb08b0dd23jurica-koletic-7yvzyzeitc8-unsplash.jpg.jpg', NULL, 'Ventes à l\'export', '\nSed mollis arcu nec tellus efficitur vulputate. Praesent ornare, mi nec consequat lobortis, velit urna mattis elit, vel ullamcorper nisi lacus ultrices nisl. Vestibulum purus odio, vulputate eu ex vel, sagittis cursus felis. Vestibulum justo libero, facilisis sed fermentum sit amet, consequat ornare risus. Integer non ipsum iaculis, dictum diam quis, mollis metus.', '1993-10-14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Listage de la structure de la table groupomania3. user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  UNIQUE KEY `user_roles_userId_roleId_unique` (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table groupomania3.user_roles : ~1 rows (environ)
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`roleId`, `userId`, `createdAt`, `updatedAt`) VALUES
	(1, 2, '2021-05-23 13:59:22', '2021-05-23 13:59:22'),
	(1, 3, '2021-05-23 14:02:22', '2021-05-23 14:02:22'),
	(1, 4, '2021-05-23 14:05:48', '2021-05-23 14:05:48'),
	(1, 5, '2021-05-23 14:09:19', '2021-05-23 14:09:19'),
	(3, 1, '2021-05-07 10:09:33', '2021-05-07 10:09:33');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
