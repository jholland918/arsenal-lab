<?php

class ArsenalRepository extends Repository {

    public function getAll() {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::select());
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');
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

    public function getById($id) {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::select() . ' WHERE id = :id');
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');
            $statement->bindParam(':id', $id, PDO::PARAM_INT);
            $statement->execute();

            $record = $statement->fetch();
            if ($statement->rowCount() > 0) {
                $record->escape();
            }

            return $record;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function insert(Arsenal $arsenal) {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::insert());
            $statement->bindParam(':name', $arsenal->name, PDO::PARAM_STR, 50);
            $statement->bindParam(':description', $arsenal->description, PDO::PARAM_STR, 1000);
            $statement->bindParam(':config', $arsenal->config, PDO::PARAM_STR, 1000);
            $statement->bindParam(':author', $arsenal->author, PDO::PARAM_STR, 50);
            $statement->bindParam(':created_date', date("Y-m-d H:i:s"), PDO::PARAM_STR, 50);
            $statement->bindParam(':case_size', $arsenal->case_size, PDO::PARAM_INT);
            $statement->execute();

            $arsenal->id = $connection->lastInsertId();

            if ($arsenal->id > 0) {
                $this->insertSchools($arsenal);
            }

            return $arsenal->id;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function insertSchools(Arsenal $arsenal) {

        $schools = explode ( ',' , $arsenal->schools);
        $arsenalSchool = new ArsenalSchool();
        $arsenalSchool->arsenal_id = $arsenal->id;

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::insertSchools());
            $statement->bindParam(':arsenal_id', $arsenalSchool->arsenal_id, PDO::PARAM_INT);
            $statement->bindParam(':school_id', $arsenalSchool->school_id, PDO::PARAM_INT);
            
            
            foreach ($schools as $school) {

                $arsenalSchool->school_id = School::$$school;

                $statement->execute();
            }

            return $statement->rowCount();
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

}
