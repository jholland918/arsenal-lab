<?php

class Skill {

    public $id;
    public $skill_number;
    public $version;
    public $name;
    public $school;
    public $type;
    public $cost;
    public $str_def;
    public $use;
    public $distance;
    public $rarity;
    public $skill_text;
    public $air;
    public $velocity;
    public $homing;
    public $recovery;
    public $notes;

    public function init(array $data) {
        $this->skill_number = $data['skill_number'];
        $this->version = $data['version'];
        $this->name = $data['name'];
        $this->school = $data['school'];
        $this->type = $data['type'];
        $this->cost = $data['cost'];
        $this->str_def = $data['str_def'];
        $this->use = $data['use'];
        $this->distance = $data['distance'];
        $this->rarity = $data['rarity'];
        $this->skill_text = $data['skill_text'];
        $this->air = $data['air'];
        $this->velocity = $data['velocity'];
        $this->homing = $data['homing'];
        $this->recovery = $data['recovery'];
        $this->notes = $data['notes'];
    }

    public function escape() {
        $this->skill_number = h($this->skill_number);
        $this->version = h($this->version);
        $this->name = h($this->name);
        $this->school = h($this->school);
        $this->type = h($this->type);
        $this->cost = h($this->cost);
        $this->str_def = h($this->str_def);
        $this->use = h($this->use);
        $this->distance = h($this->distance);
        $this->rarity = h($this->rarity);
        $this->skill_text = h($this->skill_text);
        $this->air = h($this->air);
        $this->velocity = h($this->velocity);
        $this->homing = h($this->homing);
        $this->recovery = h($this->recovery);
        $this->notes = h($this->notes);
    }

}
