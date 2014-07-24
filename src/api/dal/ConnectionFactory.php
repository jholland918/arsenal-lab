<?php

final class ConnectionFactory {

    public static function Instance() {
        static $inst = null;
        if ($inst === null) {
            $inst = new PDO('sqlite:' . DB_FILE);
        }
        return $inst;
    }

    private function __construct() {
        
    }

}