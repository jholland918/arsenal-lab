<?php

class TagRepository extends Repository {
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
