CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"admin" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "songs" (
	"id" serial NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"composer" varchar(255) NOT NULL,
	"arranged_by" varchar(255) NOT NULL,
	"voicing_id" int NOT NULL,
	"quantity" int NOT NULL,
	"copyright_year" int,
	"publisher_id" int NOT NULL,
	"image_url" varchar(255),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "voicings" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "publishers" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"url" varchar(255),
	"email" varchar(255),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "genres" (
	"id" serial NOT NULL UNIQUE,
	"genre_name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "genres_songs" (
	"id" serial NOT NULL UNIQUE,
	"genre_id" int NOT NULL,
	"song_id" int NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ensembles" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "performances" (
	"id" serial NOT NULL UNIQUE,
	"date" date NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "performances_songs" (
	"id" serial NOT NULL UNIQUE,
	"performance_id" int NOT NULL,
	"song_id" int NOT NULL,
	"song_notes" varchar(255) NOT NULL,
	"ensemble_id" int NOT NULL,
	PRIMARY KEY ("id")
);



ALTER TABLE "songs" ADD CONSTRAINT "songs_fk4" FOREIGN KEY ("voicing_id") REFERENCES "voicings"("id");

ALTER TABLE "songs" ADD CONSTRAINT "songs_fk7" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id");



ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_fk1" FOREIGN KEY ("genre_id") REFERENCES "genres"("id");

ALTER TABLE "genres_songs" ADD CONSTRAINT "genres_songs_fk2" FOREIGN KEY ("song_id") REFERENCES "songs"("id");


ALTER TABLE "performances_songs" ADD CONSTRAINT "performances_songs_fk1" FOREIGN KEY ("performance_id") REFERENCES "performances"("id");

ALTER TABLE "performances_songs" ADD CONSTRAINT "performances_songs_fk2" FOREIGN KEY ("song_id") REFERENCES "songs"("id");

ALTER TABLE "performances_songs" ADD CONSTRAINT "performances_songs_fk4" FOREIGN KEY ("ensemble_id") REFERENCES "ensembles"("id");

INSERT INTO ensembles
 (name)
VALUES
('Concert Choir'),
('Swing Choir'),
('Middle School'),
('Madrigals'),
('Chorale');


INSERT INTO genres
 (genre_name)
VALUES
( 'Christmas'),
( 'Classical'),
( 'Contemporary'),
( 'Folk'),
( 'Pop'),
( 'Renaissance'),
( 'Sacred'),
( 'Spiritual'),
( 'World Music');

INSERT INTO voicings
 (name)
VALUES
( 'SA'),
( 'SSA'),
( 'SSAA'),
( 'SAB'),
( '2-part'),
( '3-part'),
( 'SATB'),
( 'SSAATTBB'),
( 'TTB'),
( 'TTBB');

INSERT INTO publishers
 (name)
VALUES
( 'Alfred Music'),
( 'Boosey & Hawkes'),
( 'Concordia Publishing'),
( 'Durand'),
( 'E.C. Schirmer'),
( 'G. Schirmer'),
( 'Hal Leonard'),
( 'Heritage Music Press'),
( 'Hinshaw Music'),
( 'Oxford University Press');

INSERT INTO "user"
 (username, password, admin)
VALUES
( 'timbrown', 'tinytim', true),
( 'amymadison', 'alto', false),
( 'pipersund', 'soprano', false),
( 'ryanmiller', 'tenor', false),
( 'bobbybrown', 'bass', true);

INSERT INTO songs
(title, composer, arranged_by, voicing_id, quantity, copyright_year, publisher_id, image_url)
VALUES
('Amazing Grace', 'John Newton','','6','45', '2004','7','https://halleonard-coverimages.s3.amazonaws.com/wl/08300531-wl.jpg'),
('Ave Maria', 'Franz Schubert', '','7','47', '1970','6','https://www.jwpepper.com/cdn-cgi/image/width=83%20quality=75/covers/1/1747021.gif'),
('Danny Boy', 'Frederic Weatherly', '','4','51', '1990','1','https://static.alfred.com/cache/7e/bc/7ebcfe96ccdb4ed069c7fb6edf71d6f5.jpg'),
('Betelehemu', 'Michael J. Miller','','7','44', '2001','2','https://static.alfred.com/cache/73/a7/73a74111178ee2e09bc6ddddbf288f3e.jpg'),
('The Lion Sleeps Tonight', 'George David Weiss', '','7','50', '1992','7','https://halleonard-coverimages.s3.amazonaws.com/wl/00249511-wl.jpg'),
('Sing a New Song', 'Paul Sjolund', '','2','18', '2011','9','https://www.hinshawmusic.com/wp-content/uploads/2023/04/Hinshaw-Music-Cover-Placeholder.jpg.webp'),
('Hark! The Herald Angels Sing', 'Felix Mendelssohn', '','7','36', '1987','10','https://c.media-amazon.com/images/I/419JwRehsmL._SY342_.jpg'),
('Let It Be', 'Paul McCartney', '','7','60', '2005','7','https://halleonard-coverimages.s3.amazonaws.com/wl/08200810-wl.jpg'),
('The Road Home', 'Stephen Paulus', '','7','58', '1999','5','https://stephenpaulus.com/cdn/shop/products/Screen_Shot_2013-08-03_at_9.41.47_PM.png?v=1571438665&width=1200'),
('Lullaby', 'Johannes Brahms', '','5','51', '1965','6','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dwa786eba2/images/9200/3539200_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('How Can I Keep From Singing?', 'Robert Lowry','Robert Hugh','7','35', '2008','7','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dw7f6e0cd0/images/507/4150507_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('Cantate Domino', 'Hans Leo Hassler','John Leavitt','7','37', '1995','3','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dwf8666aaa/images/8805/3838805_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('The Battle of Jericho', 'Traditional','Roger Emerson','7','41', '2007','8','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dwd93714f9/images/3320/19533320_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('My Lord, What a Morning', 'Traditional','Victor C. Johnson','7','44', '1998','1','https://static.alfred.com/cache/ea/b8/eab8e09867380f2aa61f7243afb64ab5.jpg'),
('Shenandoah', 'James Erb','','10','22', '1987','2','https://www.jwpepper.com/cdn-cgi/image/width=190%20quality=75/covers/1/1898949.jpg'),
('Cantique de Jean Racine', 'Gabriel Fauré', '','7','56', '1981','4','https://www.jwpepper.com/cdn-cgi/image/width=190%20quality=75/covers/1/1629864.jpg'),
('For the Beauty of the Earth', 'John Rutter', '','7','43', '2004','10','https://global.oup.com/academic/covers/pdp/9780193405721'),
('I’m Gonna Sing', 'Traditional', '','7','42', '1990','9','https://media.publit.io/file/Hinshaw/Hinshaw1993/HMC1278_I-m-A-Gonna-Sing_-1993-_cover.png'),
('O Magnum Mysterium', 'Morten Lauridsen', '','7','29', '1994','9','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dw95a07a90/images/6347/19556347_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('Mister Sandman', 'Pat Ballard','Ed Lojeski','2','18', '1986','7','https://halleonard-coverimages.s3.amazonaws.com/wl/08243403-wl.jpg'),
('Ain’t No Mountain High Enough', 'Nickolas Ashford','Roger Emerson','7','35', '2009','7','https://halleonard-coverimages.s3.amazonaws.com/wl/08201028-wl.jpg'),
('The Peaceable Kingdom', 'Randall Thompson', '','7','56', '1967','5','https://www.ecspublishing.com/pub/media/catalog/product/cache/93cefd10cac7840c9c2bda9c82348293/1/7/1730.jpg'),
('Rock-a-My Soul', 'Traditional','Kirby Shaw','7','54', '2004','7','https://halleonard-coverimages.s3.amazonaws.com/wl/00287158-wl.jpg'),
('Deep River', 'Traditional','R. Nathaniel Dett','9','32', '1995','1','https://static.alfred.com/cache/79/a1/79a1c292766b27604d3310fb4e97733b.jpg'),
('Joshua Fit the Battle of Jericho', 'Traditional','Roger Emerson','7','45', '2010','7','https://www.sheetmusicplus.com/dw/image/v2/BJFX_PRD/on/demandware.static/-/Sites-smp-main/default/dw82b00f61/images/3321/19533321_cover-large_file.png?sw=900&sh=1200&sm=fit'),
('All Things Bright and Beautiful', 'John Rutter', '','7','34', '2002','10','https://global.oup.com/academic/covers/pdp/9780193407343'),
('The Little Drummer Boy', 'Katherine K. Davis','Harry Simeone','2','23', '1997','7','https://halleonard-coverimages.s3.amazonaws.com/wl/35013037-wl.jpg'),
('Sicut Cervus', 'Giovanni Pierluigi da Palestrina', '','7','33', '1984','6','https://www.jwpepper.com/cdn-cgi/image/width=190%20quality=75/covers/1/1382456.jpg'),
('In the Bleak Midwinter', 'Gustav Holst','Phillip Keveren','2','28', '1990','10','https://s7d9.scene7.com/is/image/LifeWayChristianResources/005805390?wid=840');


INSERT INTO performances
 (date)
 VALUES
 ('10/14/2022'),
 ('11/5/2022'),
 ('12/18/2022'),
 ('02/05/2023'),
 ('03/24/2023'),
 ('05/11/2023');
 
 INSERT INTO performances_songs
  (performance_id, song_id, song_notes, ensemble_id)
  VALUES
  (1, 14, 'Great first concert', 1),
  (1, 9, '', 1),
  (1, 21, 'Nailed it', 2),
  (2, 17, 'Probably too hard for this early in the year', 5),
  (2, 28, 'Great first concert', 4),
  (3, 7, 'Rhythyms were not great', 3),
  (4, 20, '', 2),
  (5, 12, 'Just missed qualifying for State with this.', 1),
  (6, 3, '', 5);
  
  
INSERT INTO genres_songs
  (genre_id, song_id)
  VALUES
	(1,4),
	(1,7),
	(1,10),
	(1,27),
	(1,29),
	(2,2),
	(2,12),
	(2,16),
	(2,19),
	(2,28),
	(3,3),
	(3,6),
	(3,9),
	(3,11),
	(3,17),
	(3,26),
	(4,3),
	(4,15),
	(4,23),
	(5,5),
	(5,8),
	(5,20),
	(5,21),
	(6,12),
	(6,19),
	(6,28),
	(7,1),
	(7,19),
	(7,25),
	(8,1),
	(8,6),
	(8,13),
	(8,18),
	(8,22),
	(8,24),
	(8,25),
	(8,14),
	(9,4);