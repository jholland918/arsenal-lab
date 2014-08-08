<?php

class SQLiteDatabaseCreator {

    /**
     * @var PDO
     */
    private $connection;

    public function createDatabase() {
        // Just connecting to a non-existant database will cause it to be created
        $this->connection = new PDO('sqlite:' . DB_FILE);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->createTables();
        $this->connection = null;
        $this->fillTables();
    }

    private function createTables() {
        $this->connection->exec(SQLiteDatabaseSql::CreateSkillTable());
        $this->connection->exec(SQLiteDatabaseSql::CreateArsenalTable());
        $this->connection->exec(SQLiteDatabaseSql::CreateArsenalSkillTable());
    }

    private function fillTables() {
        $skillRepository = new SkillRepository();
        $count = $skillRepository->getCount();
        
        if ($count > 0) {
            return;
        }
        
        $data = CsvReader::csvToArray(ROOT . "/assets/pd_skills.csv");
        $skillRepository->insertMany($data);
    }

}
