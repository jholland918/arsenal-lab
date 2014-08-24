define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./index-page.html');
    var browseClient = require('/../app/clients/browseClient.js');

    function IndexPage(params) {

        var self = this;
        
        self.arsenalUrlBase = window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal/';

        self.arsenals = ko.observableArray();

        $(document).on("filterSubmitted", function(event, params) {
            var dto = {
                payload: params.payload,
                data: []
            };

            browseClient.filter(dto)
                    .then(self.showArsenals)
                    .catch(function(error) {
                        alert(JSON.stringify(error));
                    });
        });

        self.showArsenals = function(dto) {
            self.arsenals(dto.data.arsenals);
        };
        
        self.formatTags = function(tags) {
            
        };

        var dto = {
            data: []
        };

        browseClient.latest(dto)
                .then(self.showArsenals)
                .catch(function(error) {
                    alert(JSON.stringify(error));
                });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    IndexPage.prototype.dispose = function() {
        $(document).off("filterSubmitted");
    };

    return {viewModel: IndexPage, template: templateMarkup};

});
