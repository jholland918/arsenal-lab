<?php

$requestUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';

if (substr($requestUri, 0, 17) == '/arsenal-lab/api/') {
    require 'api/main.php';
} else {
    require 'page.php';
}

