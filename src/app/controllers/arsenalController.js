/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var controller = require('arsenal-lab/app/controllers/controller');
    var arsenalClient = require('arsenal-lab/app/clients/arsenalClient');
    var skillClient = require('arsenal-lab/app/clients/skillClient');
    var ArsenalCreate = require('arsenal-lab/app/viewModels/ArsenalCreate');
    var ArsenalEdit = require('arsenal-lab/app/viewModels/ArsenalEdit');
    var ArsenalShow = require('arsenal-lab/app/viewModels/ArsenalShow');
    
    var create = function() {

        var dto = {
            data: [],
            viewName: 'arsenal/create'
        };

        skillClient.getAll(dto)
                .then(controller.renderView)
                .then(create_bindViewModel)
                .catch(function(error) {
                    alert(error);
                });

    };

    var create_bindViewModel = function(dto) {

        var viewModel = new ArsenalCreate(dto);
        ko.applyBindings(viewModel);
    };

    var edit = function(id) {
        
        var dto = {
            payload: {
                arsenalId: id
            },
            data: [],
            viewName: 'arsenal/edit'
        };

        skillClient.getAll(dto)
                .then(arsenalClient.getById)
                .then(controller.renderView)
                .then(edit_bindViewModel)
                .catch(function(error) {
                    alert(error);
                });

    };

    var edit_bindViewModel = function(dto) {

        var viewModel = new ArsenalEdit(dto);
        ko.applyBindings(viewModel);
    };

    var show = function(id) {
        
        var dto = {
            payload: {
                arsenalId: id
            },
            data: [],
            viewName: 'arsenal/show'
        };

        skillClient.getAll(dto)
                .then(arsenalClient.getById)
                .then(controller.renderView)
                .then(show_bindViewModel)
                .catch(function(error) {
                    alert(error);
                });

    };

    var show_bindViewModel = function(dto) {

        var viewModel = new ArsenalShow(dto);
        ko.applyBindings(viewModel);
    };
    
    return {
        create: create,
        edit: edit,
        show: show
    };
});