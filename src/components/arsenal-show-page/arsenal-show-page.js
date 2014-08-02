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
        self.url = ko.observable();
        self.name = ko.observable();
        
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

        self.author(dto.data.arsenal.author);
        self.created_date(dto.data.arsenal.created_date);
        self.description(dto.data.arsenal.description);
        self.url(window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal-show/' + dto.data.arsenal.id);
        self.name(dto.data.arsenal.name);
    };

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalShowPage.prototype.dispose = function() {
    };

    return {viewModel: ArsenalShowPage, template: templateMarkup};

});
