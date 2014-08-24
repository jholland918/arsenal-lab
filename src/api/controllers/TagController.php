<?php

class TagController extends Controller {

    /**
     * @var TagRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();

        $this->repository = new TagRepository();
    }
    
    // GET /api/tags
    public function index() {
        $tags = $this->repository->getAll();

        $response = [
            'success' => 1,
            'data' => $tags
        ];

        $this->respond($response);
    }
    
    // GET /api/tags/names
    public function names() {
        $tagNames = $this->repository->getTagNames();

        $response = [
            'success' => 1,
            'data' => $tagNames
        ];

        $this->respond($response);
    }

}
