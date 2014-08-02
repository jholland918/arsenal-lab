<?php

class SkillRepository extends Repository {

    public function getCount() {
        
        try {
            $connection = $this->getConnection();

            $statement = $connection->prepare('SELECT COUNT(*) FROM skill');
            $statement->execute();

            $result = $statement->fetchColumn(0);

            return $result;
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

    public function getAll() {

        try {
            $connection = $this->getConnection();

            $orderBy = " ORDER BY CASE school WHEN 'Psycho' THEN 0 WHEN 'Optical' THEN 1 WHEN 'Nature' THEN 2 WHEN 'Ki' THEN 3 WHEN 'Faith' THEN 4 END, skill_number";

            $statement = $connection->prepare(SkillSql::select() . $orderBy);
            $statement->setFetchMode(PDO::FETCH_CLASS, 'Skill');
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

    public function insertMany(array $data) {

        try {
            $connection = $this->getConnection();

            $skill = new Skill();

            $statement = $connection->prepare(SkillSql::insert());
            $statement->bindParam(':skill_number', $skill->skill_number, PDO::PARAM_INT);
            $statement->bindParam(':version', $skill->version, PDO::PARAM_STR);
            $statement->bindParam(':name', $skill->name, PDO::PARAM_STR);
            $statement->bindParam(':school', $skill->school, PDO::PARAM_STR);
            $statement->bindParam(':type', $skill->type, PDO::PARAM_STR);
            $statement->bindParam(':cost', $skill->cost, PDO::PARAM_STR);
            $statement->bindParam(':str_def', $skill->str_def, PDO::PARAM_STR);
            $statement->bindParam(':use', $skill->use, PDO::PARAM_STR);
            $statement->bindParam(':distance', $skill->distance, PDO::PARAM_STR);
            $statement->bindParam(':rarity', $skill->rarity, PDO::PARAM_STR);
            $statement->bindParam(':skill_text', $skill->skill_text, PDO::PARAM_STR);
            $statement->bindParam(':air', $skill->air, PDO::PARAM_STR);
            $statement->bindParam(':velocity', $skill->velocity, PDO::PARAM_STR);
            $statement->bindParam(':homing', $skill->homing, PDO::PARAM_STR);
            $statement->bindParam(':recovery', $skill->recovery, PDO::PARAM_STR);
            $statement->bindParam(':notes', $skill->notes, PDO::PARAM_STR);

            foreach ($data as $row) {

                $skill->init($row);

                $statement->execute();
            }

            return $statement->rowCount();
        } catch (PDOException $e) {

            $connection = null;
            echo $e->getMessage();
        }
    }

}
