<?php

$app->hook('slim.before.router', function () use($app) {
    $uri = $app->request()->getResourceUri();
    
    // Remove '/api' from uri
    $uri = substr($uri, 4);

    if (($k = strpos($uri, "/", 1)) === false) {
        $controller = $uri;
    } else {
        $controller = substr($uri, 0, $k);
    }

    // define controllers here
    switch ($controller) {
        case "/skills": require CONTROLLER_PATH . '/SkillController.php';
            break;
        case "/arsenals": require CONTROLLER_PATH . '/ArsenalController.php';
            break;
    }
});
