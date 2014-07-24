<?php

/*
$csvData = CsvReader::csvToArray(ROOT . "/Assets/pd_skills.csv");
*/

class CsvReader {

    public static function csvToArray($filename, $header_map = NULL, $delimiter = ',') {
        if (!file_exists($filename) || !is_readable($filename)) {
            return FALSE;
        }

        $header = NULL;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== FALSE) {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE) {
                if (!$header) {
                    if (is_null($header_map)) {
                        $header = $row;
                    } else {
                        $header = $header_map;
                    }
                } else {
                    $data[] = array_combine($header, $row);
                }
            }
            fclose($handle);
        }
        return $data;
    }

}