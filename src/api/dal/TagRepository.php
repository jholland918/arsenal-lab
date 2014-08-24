<?php

class TagRepository extends Repository {

    public function getAll() {

        try {
            $connection = $this->getConnection();
            
            $sql = 'SELECT id, name FROM tag ORDER BY name;';

            $statement = $connection->prepare($sql);
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Tag');
            $statement->execute();

            $records = [];
            while ($record = $statement->fetch()) {
                $record->escape();
                $records[] = $record;
            }

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function getTagNames() {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare('SELECT name FROM tag ORDER BY name;');
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $records = [];
            while ($record = $statement->fetch()) {
                $records[] = h($record['name']);
            }

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

}
