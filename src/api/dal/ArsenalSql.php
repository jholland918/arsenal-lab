<?php

class ArsenalSql {

    public static function select() {
        $sql = <<<'EOT'
SELECT
id,
name,
description,
config,
author,
created_date,
case_size
FROM arsenal 
EOT;
        return $sql;
    }

    public static function insert() {
        $sql = <<<'EOT'
INSERT INTO arsenal 
(
id,
name,
description,
config,
author,
created_date,
case_size
)
VALUES 
(
NULL,
:name,
:description,
:config,
:author,
:created_date,
:case_size
);
EOT;
        return $sql;
    }

    public static function insertSchools() {

        $sql = <<<'EOT'
INSERT INTO arsenal_school 
(
id,
arsenal_id,
school_id
)
VALUES 
(
NULL,
:arsenal_id,
:school_id
);
EOT;

        return $sql;
    }

    public static function selectTagByName() {
        $sql = <<<'EOT'
SELECT
id,
name
FROM tag 
WHERE name = :name;
EOT;
        return $sql;
    }

    public static function insertTag() {
        $sql = <<<'EOT'
INSERT INTO tag 
(
id,
name
)
VALUES 
(
NULL,
:name
);
EOT;
        return $sql;
    }

    public static function insertArsenalTag() {
        $sql = <<<'EOT'
INSERT INTO arsenal_tag 
(
id,
arsenal_id,
tag_id
)
VALUES 
(
NULL,
:arsenal_id,
:tag_id
);
EOT;
        return $sql;
    }

    public static function schoolFilter($connection, $schools) {

        $sql = '';

        if (count($schools) != 5) {
            
            $params = [];
            foreach ($schools as $value) {
                $params[] = $connection->quote($value);
            }

            $sql .= 'id IN ( ';
            $sql .= 'SELECT DISTINCT arsenal_id ';
            $sql .= 'FROM arsenal_school AS a ';
            $sql .= 'LEFT JOIN school AS b ';
            $sql .= 'ON a.school_id = b.id ';
            $sql .= 'WHERE b.name IN (' . implode(',', $params) . ') ';
            $sql .= ') ';
        }

        return $sql;
    }

    public static function tagFilter($connection, $arsenalTags) {

        $sql = '';

        if ($arsenalTags != null && count($arsenalTags) > 0) {
           
            $params = [];
            foreach ($arsenalTags as $value) {
                $params[] = (int) $value;
            }

            $sql .= 'id IN ( ';
            $sql .= 'SELECT DISTINCT arsenal_id ';
            $sql .= 'FROM arsenal_tag ';
            $sql .= 'WHERE tag_id IN (' . implode(',', $params) . ') ';
            $sql .= ') ';
        }

        return $sql;
    }

}
