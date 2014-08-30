define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./index-page.html');
    var browseClient = require('/../app/clients/browseClient.js');

    function IndexPage(params) {

        var self = this;

        self.arsenalUrlBase = window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal/';

        self.arsenals = ko.observableArray();

        self.pagination = ko.observable();

        $(document).on("filterSubmitted", function(event, params) {
            
            params.payload.push({
                "name": "filter",
                "value": true
            });

            params.payload.push({
                "name": "page",
                "value": 1
            });

            self.getFilterResults(params.payload);
        });


        self.showArsenals = function(dto) {
            self.arsenals(dto.data.arsenals);
            self.pagination(dto.data.paginationMarkup);
        };

        self.getLatestResults = function(page) {
            var dto = {
                payload: {
                    page: page
                },
                data: []
            };

            browseClient.latest(dto)
                    .then(self.showArsenals)
                    .catch(function(error) {
                        alert(JSON.stringify(error));
                    });
        };

        self.getFilterResults = function(payload) {

            var dto = {
                payload: payload,
                data: []
            };

            browseClient.filter(dto)
                    .then(self.showArsenals)
                    .catch(function(error) {
                        alert(JSON.stringify(error));
                    });
        };

        var page = 1;
        var filter = false;
        var filterPayload = null;
        
        if (params[0]) {

            if (_.has(params[0], 'page')) {
                page = params[0].page;
            }
            
            if (_.has(params[0], 'filter')) {
                
                filter = params[0].filter;
                
                filterPayload = $.param(params['?query']);
            }
        }
        
        if (filter) {
            self.getFilterResults(filterPayload);
        } else {
            self.getLatestResults(page);
        }
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    IndexPage.prototype.dispose = function() {
        $(document).off("filterSubmitted");
    };

    return {viewModel: IndexPage, template: templateMarkup};

});
