<?php

class BrowseController extends Controller {

    /**
     * @var ArsenalRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();

        $this->repository = new ArsenalRepository();
    }

    // GET /api/browse/filter
    public function filter() {

        $request = $this->app->request;

        $case = $request->get('case');
        $schools = $request->get('schools');
        $skillNumber = $request->get('skill-number');
        $arsenalTags = $request->get('arsenal-tags');
        
        $records = $this->repository->getByFilter($case, $schools, $skillNumber, $arsenalTags);

        $response = [
            'success' => 1,
            'data' => $records
        ];

        $this->respond($response);
    }
    
    // GET /api/browse/latest
    public function latest() {
        
        $records = $this->repository->getLatest();

        $response = [
            'success' => 1,
            'data' => $records
        ];

        $this->respond($response);
    }

}
