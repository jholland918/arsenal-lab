<?php

class Tag {
    public $id;
    public $name;
    
    public function escape() {
        $this->name = h($this->name);
    }
}
