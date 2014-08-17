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
    
}
