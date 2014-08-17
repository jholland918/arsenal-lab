<?php

class ArsenalController extends Controller {

    /**
     * @var ArsenalRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();

        $this->repository = new ArsenalRepository();
    }

    // GET /api/arsenals
    public function index() {
        $arsenals = $this->repository->getAll();

        $response = [
            'success' => 1,
            'data' => $arsenals
        ];

        $this->respond($response);
    }

    // GET /api/arsenals/:id
    public function show($id) {
        $arsenal = $this->repository->getById($id);

        $response = [
            'success' => 1,
            'data' => $arsenal
        ];

        $this->respond($response);
    }

    // POST /api/arsenals
    public function create() {

        $is_valid = GUMP::is_valid($_POST, array(
                    'name' => 'max_len,15',
                    'description' => 'max_len,1000',
                    'config' => 'max_len,1000',
                    'author' => 'max_len,15',
                    'case_size' => 'integer'
        ));

        if ($is_valid !== true) {

            $response = [
                'success' => 0,
                'error' => $is_valid
            ];

            $this->respond($response);
        }

        $arsenal = new Arsenal();
        $arsenal->initFromRequest($this->app->request);

        $lastInsertId = $this->repository->insert($arsenal);
        
        $response = [
            'success' => 1,
            'data' => ['lastInsertId' => $lastInsertId]
        ];

        $this->respond($response);
    }

}
