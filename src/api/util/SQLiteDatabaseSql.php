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
    prototype INTEGER
)
EOT;
        return $sql;
    }
    


}
