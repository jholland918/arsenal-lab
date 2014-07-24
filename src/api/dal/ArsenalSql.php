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
prototype
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
prototype
)
VALUES 
(
NULL,
:name,
:description,
:config,
:author,
:created_date,
:prototype
);
EOT;
        return $sql;
    }
    
}
