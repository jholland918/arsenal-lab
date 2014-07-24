<?php

class Arsenal {

    public $id;
    public $name;
    public $description;
    public $config;
    public $author;
    public $created_date;
    public $prototype;
    
    public function initFromRequest($request) {
        $this->name = $request->post('name');
        $this->description = $request->post('description');
        $this->config = $request->post('config');
        $this->author = $request->post('author');
        $this->prototype = $request->post('prototype');
    }

    public function escape() {
        $this->name = h($this->name);
        $this->description = h($this->description);
        $this->config = h($this->config);
        $this->author = h($this->author);
        $this->prototype = h($this->prototype);
    }

}
