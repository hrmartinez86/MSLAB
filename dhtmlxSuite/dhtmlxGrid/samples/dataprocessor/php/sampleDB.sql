DROP TABLE IF EXISTS `samples_grid`;
CREATE TABLE `samples_grid` (
  `book_id` int(10) unsigned NOT NULL auto_increment,
  `sales` int(10) default '0',
  `title` varchar(200),
  `author` varchar(200),
  `price` int(10) unsigned default '0',
  `instore` varchar(1) default 'N',
  `shipping` varchar(10),
  `bestseller` varchar(1) default 'N',
  `pub_date` datetime,
  `GUID` varchar(50),
  `SYS_TS` TIMESTAMP default CURRENT_TIMESTAMP(),
  PRIMARY KEY  (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;