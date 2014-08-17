<?php

class Arsenal {

    public $id;
    public $name;
    public $description;
    public $config;
    public $author;
    public $created_date;
    public $case_size;
    public $schools;
    
    public function initFromRequest($request) {
        $this->name = $request->post('name');
        $this->description = $request->post('description');
        $this->config = $request->post('config');
        $this->author = $request->post('author');
        $this->case_size = $request->post('case_size');
        $this->schools = $request->post('schools');
    }

    public function escape() {
        $this->name = h($this->name);
        $this->description = h($this->description);
        $this->config = h($this->config);
        $this->author = h($this->author);
        $this->case_size = h($this->case_size);
    }

}
