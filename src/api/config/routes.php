<?php

/*
 * I'm going to try and stick to this Ruby inspired interface for routing API calls:
 * +-----------+---------------------+-------------------+---------------------------------------------+
 * | HTTP Verb |        Path         | Controller Method |                  Used for                   |
 * +-----------+---------------------+-------------------+---------------------------------------------+
 * | GET       | /api/posts          | index             | Display a list of all posts                 |
 * | GET       | /api/posts/new      | new               | Return an HTML form for creating a new post |
 * | POST      | /api/posts          | create            | Create a new post                           |
 * | GET       | /api/posts/:id      | show              | Display a specific post                     |
 * | GET       | /api/posts/:id/edit | edit              | Return an HTML form for editing a post      |
 * | PUT       | /api/posts/:id      | update            | Update a specific post                      |
 * | DELETE    | /api/posts/:id      | destroy           | Delete a specific post                      |
 * +-----------+---------------------+-------------------+---------------------------------------------+
 */

// Skill
$app->get('/api/skills', 'SkillController:index');

// Arsenal
$app->get('/api/arsenals', 'ArsenalController:index');

$app->get('/api/arsenals/:id', 'ArsenalController:show');

$app->post('/api/arsenals', 'ArsenalController:create');

// Browse
$app->get('/api/browse/filter', 'BrowseController:filter');

$app->get('/api/browse/latest', 'BrowseController:latest');

// Tag
$app->get('/api/tags', 'TagController:index');

$app->get('/api/tags/names', 'TagController:index');
