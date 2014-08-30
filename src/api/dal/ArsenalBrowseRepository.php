<?php

class ArsenalBrowseRepository extends Repository {

    public function getLatestTotal() {

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare('SELECT COUNT(*) FROM arsenal');
            $statement->execute();

            $result = $statement->fetchColumn(0);

            return $result;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function getLatest($page, $recordsPerPage) {

        $offset = $recordsPerPage * ($page - 1);

        $suffix = '';
        $suffix .= ' WHERE id NOT IN ( SELECT id FROM arsenal ORDER BY created_date DESC LIMIT :offset ) ';
        $suffix .= 'ORDER BY created_date DESC LIMIT :recordsPerPage ';

        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalSql::select() . $suffix);
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');
            $statement->bindParam(':offset', $offset, PDO::PARAM_INT);
            $statement->bindParam(':recordsPerPage', $recordsPerPage, PDO::PARAM_INT);
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

    public function filterTotal($case, $schools, $skillNumber, $tags) {

        try {
            $connection = $this->getConnection();

            $sql = $this->buildFilterSql(true, $connection, $case, $schools, $skillNumber, $tags);

            $statement = $connection->prepare($sql);

            if ($skillNumber != -1) {
                $statement->bindParam(':skill_number', $skillNumber, PDO::PARAM_STR);
            }

            $statement->execute();

            $result = $statement->fetchColumn(0);

            return $result;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function filter($page, $recordsPerPage, $case, $schools, $skillNumber, $tags) {

        $offset = $recordsPerPage * ($page - 1);

        try {
            $connection = $this->getConnection();

            $sql = $this->buildFilterSql(false, $connection, $case, $schools, $skillNumber, $tags);

            $statement = $connection->prepare($sql);
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Arsenal');
            $statement->bindParam(':offset', $offset, PDO::PARAM_INT);
            $statement->bindParam(':recordsPerPage', $recordsPerPage, PDO::PARAM_INT);

            if ($skillNumber != -1) {
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

    private function buildFilterSql($getTotal, $connection, $case, $schools, $skillNumber, $tags) {

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

        $schoolFilter = ArsenalBrowseSql::schoolFilter($connection, $schools);
        if ($schoolFilter) {
            array_push($filters, $schoolFilter);
        }

        $skillFilter = '';
        if ($skillNumber != -1) {
            $skillNumber = '%"' . $skillNumber . '"%';
            $skillFilter = "config LIKE :skill_number ";
            array_push($filters, $skillFilter);
        }

        $tagFilter = ArsenalBrowseSql::tagFilter($tags);
        if ($tagFilter) {
            array_push($filters, $tagFilter);
        }

        $where = ' ';
        if (count($filters) > 0) {
            $where = ' WHERE ' . implode(" AND ", $filters);
        }

        $orderBy = ' ORDER BY created_date DESC';

        $select = '';

        if ($getTotal) {

            $select = 'SELECT COUNT(*) FROM arsenal ';
        } else {

            $select = ArsenalSql::select();

            $where .= ' AND id NOT IN ( SELECT id FROM arsenal ' . $where . ' ' . $orderBy . ' LIMIT :offset ) ';

            $orderBy .= ' LIMIT :recordsPerPage ';
        }

        $sql = $select . $where . $orderBy;

        return $sql;
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

    private function getArsenalSchools($arsenalIds) {
        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare(ArsenalBrowseSql::selectArsenalSchools($arsenalIds));
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

            $statement = $connection->prepare(ArsenalBrowseSql::selectArsenalTags($arsenalIds));
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
