<?php

class Controller {
    
    /**
     * @var \Slim\Slim;
     */
    protected $app;

    public function __construct() {
        global $app;

        $this->app = $app;
    }
    
    protected function render($template, $data = array(), $status = null) {
        $this->app->render($template, $data, $status);
    }
    
    protected function respond(array $result) {
        header("Content-Type: application/json");
        echo json_encode($result);
        exit;
    }
    
    protected function redirect($url, $status = 302) {
        $this->app->redirect($url, $status);
    }
}
