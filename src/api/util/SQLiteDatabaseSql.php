<?php

class SQLiteDatabaseSql {

    public static function CreateSkillTable() {
        $sql = <<<'EOT'
CREATE TABLE IF NOT EXISTS skill
(
    id INTEGER PRIMARY KEY,
    skill_number INTEGER,
    version TEXT,
    name TEXT,
    school TEXT,
    type TEXT,
    cost TEXT,
    str_def TEXT,
    use TEXT,
    distance TEXT,
    rarity TEXT,
    skill_text TEXT,
    air TEXT,
    velocity TEXT,
    homing TEXT,
    recovery TEXT,
    notes TEXT
)
EOT;
        return $sql;
    }
   
    public static function CreateArsenalTable() {
        $sql = <<<'EOT'
CREATE TABLE IF NOT EXISTS arsenal 
(
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    config TEXT,
    author TEXT,
    created_date TEXT,
    case_size INTEGER
)
EOT;
        return $sql;
    }
    
    public static function CreateSchoolTable() {
        $sql = <<<'EOT'
CREATE  TABLE IF NOT EXISTS  "school" 
(
"id" INTEGER PRIMARY KEY  NOT NULL  UNIQUE, 
"name" TEXT NOT NULL 
);

INSERT INTO "school" ("id","name") 
SELECT 0, 'Psycho'
WHERE NOT EXISTS(SELECT 1 FROM "school" WHERE "id" = 0 AND "name" = 'Psycho');

INSERT INTO "school" ("id","name") 
SELECT 1, 'Optical'
WHERE NOT EXISTS(SELECT 1 FROM "school" WHERE "id" = 1 AND "name" = 'Optical');

INSERT INTO "school" ("id","name") 
SELECT 2, 'Nature'
WHERE NOT EXISTS(SELECT 1 FROM "school" WHERE "id" = 2 AND "name" = 'Nature');

INSERT INTO "school" ("id","name") 
SELECT 3, 'Ki'
WHERE NOT EXISTS(SELECT 1 FROM "school" WHERE "id" = 3 AND "name" = 'Ki');

INSERT INTO "school" ("id","name") 
SELECT 4, 'Faith'
WHERE NOT EXISTS(SELECT 1 FROM "school" WHERE "id" = 4 AND "name" = 'Faith');
EOT;
        return $sql;
    }

    public static function CreateArsenalSchoolTable() {
        $sql = <<<'EOT'
CREATE TABLE IF NOT EXISTS "arsenal_school" 
(
"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
"arsenal_id" INTEGER, 
"school_id" INTEGER
);
EOT;
        return $sql;
    }
}
