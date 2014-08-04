define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./arsenal-show-page.html');
    var skillClient = require('/../app/clients/skillClient.js');
    var arsenalClient = require('/../app/clients/arsenalClient.js');

    function ArsenalShowPage(params) {

        var self = this;
       
        // TODO: The following arsenal details (author/description) do not 
        // change after the initial load so they don't really need to be 
        // observable other than to init them after we get data back from the 
        // server. I wonder if there is a way to delay the page load until the 
        // server data is received so they don't have to be observable?
        self.author = ko.observable();
        self.created_date = ko.observable();
        self.description = ko.observable();
        self.showUrl = ko.observable();
        self.editUrl = ko.observable();
        self.name = ko.observable();
        self.arsenalTitle = ko.observable();
        
        this.arsenalId = params.id;

        var dto = {
            self: this,
            payload: {
                arsenalId: params.id
            },
            data: []
        };

        skillClient.getAll(dto)
                .then(arsenalClient.getById)
                .then(init)
                .catch(function(error) {
                    alert(error);
                });
    }

    var init = function(dto) {

        var self = dto.self;

        self.created_date(dto.data.arsenal.created_date);
        self.description(dto.data.arsenal.description);
        self.showUrl(window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal/' + dto.data.arsenal.id);
        self.editUrl(window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal/edit/' + dto.data.arsenal.id);
        
        self.arsenalTitle(dto.data.arsenal.name + '<br><small>by ' + dto.data.arsenal.author + '</small>');
    };

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalShowPage.prototype.dispose = function() {
    };

    return {viewModel: ArsenalShowPage, template: templateMarkup};

});
