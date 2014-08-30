<?php

class ArsenalBrowseSql {

    public static function selectArsenalSchools($arsenalIds) {

        $sql = '';

        if ($arsenalIds != null && count($arsenalIds) > 0) {

            $params = [];
            foreach ($arsenalIds as $value) {
                $params[] = (int) $value;
            }

            $sql .= 'SELECT ';
            $sql .= 'a.arsenal_id, ';
            $sql .= 'b.name ';
            $sql .= 'FROM arsenal_school AS a ';
            $sql .= 'LEFT JOIN school AS b ';
            $sql .= 'ON a.school_id = b.id ';
            $sql .= 'WHERE a.arsenal_id IN (' . implode(',', $params) . ') ';
        }

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

    public static function tagFilter($arsenalTags) {

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

    public static function selectArsenalTags($arsenalIds) {

        $sql = '';

        if ($arsenalIds != null && count($arsenalIds) > 0) {

            $params = [];
            foreach ($arsenalIds as $value) {
                $params[] = (int) $value;
            }

            $sql .= 'SELECT ';
            $sql .= 'a.arsenal_id, ';
            $sql .= 'b.name ';
            $sql .= 'FROM arsenal_tag AS a ';
            $sql .= 'LEFT JOIN tag AS b ';
            $sql .= 'ON a.tag_id = b.id ';
            $sql .= 'WHERE a.arsenal_id IN (' . implode(',', $params) . ') ';
        }

        return $sql;
    }
}
