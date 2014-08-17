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
    
/*
INSERT INTO "school" ("id","name") VALUES (1, 'Psycho')
INSERT INTO "school" ("id","name") VALUES (2, 'Optical')
INSERT INTO "school" ("id","name") VALUES (3, 'Nature')
INSERT INTO "school" ("id","name") VALUES (4, 'Ki')
INSERT INTO "school" ("id","name") VALUES (5, 'Faith')
*/
    public static function CreateSchoolTable() {
        $sql = <<<'EOT'
CREATE  TABLE IF NOT EXISTS  "school" 
(
"id" INTEGER PRIMARY KEY  NOT NULL  UNIQUE, 
"name" TEXT NOT NULL 
)
EOT;
        return $sql;
    }

}
