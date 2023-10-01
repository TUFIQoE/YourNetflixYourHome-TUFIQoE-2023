/*DROP TABLES*/
DROP TABLE IF EXISTS "archive";
DROP TABLE IF EXISTS "assessment";
DROP TABLE IF EXISTS "playback_data";
DROP TABLE IF EXISTS "video";
DROP TABLE IF EXISTS "experiment";


CREATE TABLE "archive" (
	"id"	INTEGER NOT NULL,
	"video_id"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	"timestamp"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("video_id") REFERENCES "video"("id")
);

CREATE TABLE "assessment" (
	"id"	INTEGER NOT NULL,
	"video_id"	INTEGER NOT NULL,
	"quality_value"	INTEGER NO NOT NULL,
	"quality_description"	TEXT NOT NULL,
	"started"	TEXT NOT NULL,
	"duration"	REAL NOT NULL,
	"timestamp"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("video_id") REFERENCES "video"("id")
);

CREATE TABLE "experiment" (
	"id"	INTEGER NOT NULL,
	"started"	TEXT NOT NULL,
	"ended"	TEXT DEFAULT NULL,
	"subject_age"	INTEGER DEFAULT NULL,
	"subject_sex"	TEXT DEFAULT NULL,
	"subject_netflix_familiarity"	BOOLEAN DEFAULT NULL,
	"content_continuation"	BOOLEAN DEFAULT NULL,
	"settings"	TEXT NOT NULL,
	"urls"	TEXT NOT NULL,
	"qualtrics"	TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "playback_data" (
	"id"	INTEGER NOT NULL,
	"video_id"	INTEGER NOT NULL,
	"buffering_bitrate_audio"	TEXT,
	"buffering_bitrate_video"	TEXT,
	"buffering_state"	TEXT,
	"buffering_vmaf"	TEXT,
	"duration"	TEXT,
	"framerate"	TEXT,
	"player_state"	TEXT,
	"playing_bitrate_video"	TEXT,
	"playing_bitrate_audio"	TEXT,
	"playing_vmaf"	TEXT,
	"position"	TEXT,
	"rendering_state"	TEXT,
	"resolution"	TEXT,
	"segment_position"	TEXT,
	"timestamp"	TEXT,
	"total_corrupted_frames"	TEXT,
	"total_dropped_frames"	TEXT,
	"total_frames"	TEXT,
	"volume"	TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY("video_id") REFERENCES "video"("id")
);

CREATE TABLE "video" (
	"id"	INTEGER NOT NULL,
	"started"	TEXT NOT NULL,
	"ended"	TEXT DEFAULT NULL,
	"experiment_id"	INTEGER NOT NULL,
	"url"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("experiment_id") REFERENCES "experiment"("id")
);