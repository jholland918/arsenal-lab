<?php 

define('ROOT', dirname(dirname(__FILE__)));
define('API_ROOT', dirname(__FILE__));
define('CONTROLLER_PATH', API_ROOT . '/controllers');
define('DB_FILE', API_ROOT . '/dal/sqlite/arsenal_lab.sqlite3');

require API_ROOT . '/vendor/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim([
    'debug' => true
        ]);

require API_ROOT . '/config/hooks.php';
require API_ROOT . '/config/routes.php';
require API_ROOT . '/controllers/Controller.php';
require API_ROOT . '/dal/ConnectionFactory.php';
require API_ROOT . '/dal/Repository.php';
require API_ROOT . '/dal/ArsenalRepository.php';
require API_ROOT . '/dal/ArsenalSql.php';
require API_ROOT . '/dal/SkillRepository.php';
require API_ROOT . '/dal/SkillSql.php';
require API_ROOT . '/dal/TagRepository.php';
require API_ROOT . '/models/Arsenal.php';
require API_ROOT . '/models/ArsenalSchool.php';
require API_ROOT . '/models/ArsenalTag.php';
require API_ROOT . '/models/Skill.php';
require API_ROOT . '/models/Tag.php';
require API_ROOT . '/types/School.php';
require API_ROOT . '/util/CsvReader.php';
require API_ROOT . '/util/globalFunctions.php';
require API_ROOT . '/util/SQLiteDatabaseCreator.php';
require API_ROOT . '/util/SQLiteDatabaseSql.php';
require API_ROOT . '/vendor/GUMP/gump.class.php';

$SQLiteDatabaseCreator = new SQLiteDatabaseCreator();
$SQLiteDatabaseCreator->createDatabase();
        
$app->run();
