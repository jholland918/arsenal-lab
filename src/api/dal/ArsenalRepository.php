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

    public function getLatest() {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::select() . ' ORDER BY created_date DESC LIMIT 500');
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');
            $statement->execute();

            $arsenalIds = [];
            $records = [];
            while ($record = $statement->fetch()) {
                $arsenalIds[] = $record->id;
                $record->escape();
                $records[] = $record;
            }
            
            $records = $this->fillArsenalMeta($arsenalIds, $records);

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function getByFilter($case, $schools, $skillNumber, $tags) {

        try {
            $connection = $this->getConnection();

            $filters = [];

            $caseFilter = '';
            if (count($case) != 3) {

                $params = [];
                foreach ($case as $value) {
                    $params[] = (int) $value;
                }

                $caseFilter = 'case_size IN (' . implode(',', $params) . ') ';
                array_push($filters, $caseFilter);
            }

            $schoolFilter = ArsenalSql::schoolFilter($connection, $schools);
            if ($schoolFilter) {
                array_push($filters, $schoolFilter);
            }

            $skillFilter = '';
            if ($skillNumber != -1) {
                $skillNumber = '%"' . $skillNumber . '"%';
                $skillFilter = "config LIKE :skill_number ";
                array_push($filters, $skillFilter);
            }

            $tagFilter = ArsenalSql::tagFilter($connection, $tags);
            if ($tagFilter) {
                array_push($filters, $tagFilter);
            }

            $sql = ArsenalSql::select();
            if (count($filters) > 0) {
                $sql .= ' WHERE ' . implode(" AND ", $filters);
            }

            $statement = $connection->prepare($sql);
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');

            if ($skillFilter) {
                $statement->bindParam(':skill_number', $skillNumber, PDO::PARAM_STR);
            }

            $statement->execute();

            $arsenalIds = [];

            $records = [];
            while ($record = $statement->fetch()) {
                $arsenalIds[] = $record->id;
                $record->escape();
                $records[] = $record;
            }
            
            $records = $this->fillArsenalMeta($arsenalIds, $records);

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function fillArsenalMeta($arsenalIds, $records) {
        $arsenalTags = $this->getArsenalTags($arsenalIds);
        $arsenalSchools = $this->getArsenalSchools($arsenalIds);

        foreach ($records as $key => $value) {

            $arsenal_id = $value->id;

            $currentTags = [];
            $currentSchools = [];

            foreach ($arsenalTags as $arsenalTag) {
                if ($arsenalTag['arsenal_id'] == $arsenal_id) {
                    $currentTags[] = $arsenalTag['name'];
                }
            }

            foreach ($arsenalSchools as $arsenalSchool) {
                if ($arsenalSchool['arsenal_id'] == $arsenal_id) {
                    $currentSchools[] = $arsenalSchool['name'];
                }
            }

            $value->schools = $currentSchools;
            $value->arsenal_tags = $currentTags;

            $records[$key] = $value;
        }

        return $records;
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
                $this->insertTags($arsenal);
            }

            return $arsenal->id;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function insertSchools(Arsenal $arsenal) {

        $schools = explode(',', $arsenal->schools);
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

    private function insertTags(Arsenal $arsenal) {

        $arsenal_tags = explode(',', $arsenal->arsenal_tags);
        $arsenalTag = new ArsenalTag();
        $arsenalTag->arsenal_id = $arsenal->id;

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::insertArsenalTag());
            $statement->bindParam(':arsenal_id', $arsenalTag->arsenal_id, PDO::PARAM_INT);
            $statement->bindParam(':tag_id', $arsenalTag->tag_id, PDO::PARAM_INT);

            foreach ($arsenal_tags as $arsenal_tag) {

                $tag_id = $this->getTagId($arsenal_tag);

                if ($tag_id > 0) {
                    $arsenalTag->tag_id = $tag_id;

                    $statement->execute();
                }
            }

            return $statement->rowCount();
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function getTagId($tagName) {
        $tag_id = null;

        $tag = $this->getTagByName($tagName);

        if ($tag) {
            $tag_id = $tag->id;
        } else {
            $tag_id = $this->insertTag($tagName);
        }

        return $tag_id;
    }

    private function getTagByName($tagName) {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::selectTagByName());
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Tag');
            $statement->bindParam(':name', $tagName, PDO::PARAM_STR, 50);
            $statement->execute();

            $record = $statement->fetch();
            $a = $statement->rowCount();
            if ($record) {
                $record->escape();
            }

            return $record;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function insertTag($tagName) {

        if ($tagName === '') {
            return -1;
        }

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::insertTag());
            $statement->bindParam(':name', $tagName, PDO::PARAM_STR, 50);
            $statement->execute();

            return $connection->lastInsertId();
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function getArsenalSchools($arsenalIds) {
        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::selectArsenalSchools($arsenalIds));
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $records = $statement->fetchAll();

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    private function getArsenalTags($arsenalIds) {
        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::selectArsenalTags($arsenalIds));
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $records = $statement->fetchAll();

            return $records;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

}
