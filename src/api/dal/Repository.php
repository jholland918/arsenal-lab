<?php

class Repository {

    /**
     * Returns a PDO instance from singleton connection factory.
     * @return PDO
     */
    protected function getConnection() {
        return ConnectionFactory::Instance();
    }

}