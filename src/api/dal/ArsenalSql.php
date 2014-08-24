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

    public static function schoolFilter($schools) {

        $sql = '';

        if (count($schools) != 5) {
            $sql = <<<'EOT'
id IN ( 
SELECT DISTINCT arsenal_id 
FROM arsenal_school AS a 
LEFT JOIN school AS b 
ON a.school_id = b.id 
WHERE b.name IN (:schools) 
) 
EOT;
        }

        return $sql;
    }

    public static function tagFilter($arsenalTags) {

        $sql = '';

        if ($arsenalTags != null && count($arsenalTags) > 0) {
            $sql = <<<'EOT'
id IN ( 
SELECT DISTINCT arsenal_id 
FROM arsenal_tag AS a 
LEFT JOIN tag AS b 
ON a.tag_id = b.id 
WHERE b.name IN (:arsenal_tags) 
) 
EOT;
        }

        return $sql;
    }

}
