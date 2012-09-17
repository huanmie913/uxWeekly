/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : bobing

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2012-09-15 12:39:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `count` int(10) NOT NULL DEFAULT '0',
  `jifen` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'fanzengwei', '123', '0', '290');
INSERT INTO `user` VALUES ('2', 'admin', 'admin', '10', '315');
INSERT INTO `user` VALUES ('3', 'fanzeng', '1234', '10', '305');
INSERT INTO `user` VALUES ('4', 'fa', 'fa', '10', '219');
INSERT INTO `user` VALUES ('5', 'fdaf', 'faf', '10', '219');
INSERT INTO `user` VALUES ('6', 'fad', 'fdaf', '10', '200');
INSERT INTO `user` VALUES ('7', 'fadf', 'fadf', '10', '215');
INSERT INTO `user` VALUES ('8', 'fad', 'fad', '10', '565');
INSERT INTO `user` VALUES ('9', 'fads', 'fdasf', '10', '255');
INSERT INTO `user` VALUES ('10', 'dsaf', 'daf', '10', '245');
INSERT INTO `user` VALUES ('10', 'test', 'test', '1000', '0');
