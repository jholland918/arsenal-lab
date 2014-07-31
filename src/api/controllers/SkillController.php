<?php

class SkillController extends Controller {
    
    /**
     * @var SkillRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();

        $this->repository = new SkillRepository();
    }
    
    // GET /api/skills
    public function index() {
        $skills = $this->repository->getAll();
        
        $response = [
            'success' => 1,
            'data' => $skills
        ];
        
        $this->respond($response);
        //$this->respond($skills);
    }
}
