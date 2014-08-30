<?php

class BrowseController extends Controller {

    /**
     * @var ArsenalBrowseRepository
     */
    private $repository;

    public function __construct() {
        parent::__construct();

        $this->repository = new ArsenalBrowseRepository();
    }

    // GET /api/browse/filter
    public function filter() {

        $request = $this->app->request;

        $case = $request->get('case');
        $schools = $request->get('schools');
        $skillNumber = $request->get('skill-number');
        $arsenalTags = $request->get('arsenal-tags');
        $page = $request->get('page');
        $recordsPerPage = 2;
        
        $latestTotal = $this->repository->filterTotal($case, $schools, $skillNumber, $arsenalTags);

        $records = $this->repository->filter($page, $recordsPerPage, $case, $schools, $skillNumber, $arsenalTags);

        // instantiate; set current page; set number of records
        $pagination = (new Pagination());
        $pagination->setTarget('#/browse');
        $pagination->setCurrent((int)$page);
        $pagination->setTotal((int)$latestTotal);
        $pagination->setRPP((int)$recordsPerPage);

        // grab rendered/parsed pagination markup
        $markup = $pagination->parse();
        
        $response = [
            'success' => 1,
            'data' => $records,
            'paginationMarkup' => $markup
        ];

        $this->respond($response);
    }

    // GET /api/browse/latest
    public function latest() {

        $page = $this->app->request->get('page');
        
        $recordsPerPage = 10;
        
        $latestTotal = $this->repository->getLatestTotal();

        $records = $this->repository->getLatest($page, $recordsPerPage);

        // instantiate; set current page; set number of records
        $pagination = (new Pagination());
        $pagination->setTarget('#/browse');
        $pagination->setCurrent((int)$page);
        $pagination->setTotal((int)$latestTotal);
        $pagination->setRPP((int)$recordsPerPage);

        // grab rendered/parsed pagination markup
        $markup = $pagination->parse();

        $response = [
            'success' => 1,
            'data' => $records,
            'paginationMarkup' => $markup
        ];

        $this->respond($response);
    }

}
