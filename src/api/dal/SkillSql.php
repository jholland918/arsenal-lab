<?php

class SkillSql {
    
    public static function select() {
        $sql = <<<'EOT'
SELECT
id,
skill_number,
version,
name,
school,
type,
cost,
str_def,
use,
distance,
rarity,
skill_text,
air,
velocity,
homing,
recovery,
notes
FROM skill 
EOT;
        return $sql;
    }

    public static function insert() {
        $sql = <<<'EOT'
INSERT INTO skill
(
id,
skill_number,
version,
name,
school,
type,
cost,
str_def,
use,
distance,
rarity,
skill_text,
air,
velocity,
homing,
recovery,
notes
)
VALUES
(
NULL,
:skill_number,
:version,
:name,
:school,
:type,
:cost,
:str_def,
:use,
:distance,
:rarity,
:skill_text,
:air,
:velocity,
:homing,
:recovery,
:notes
);
EOT;
        return $sql;
    }

}
