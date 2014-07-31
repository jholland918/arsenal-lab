define(function(require) {
    
    var ko = require('knockout');
    var templateMarkup = require('text!./arsenal-create-page.html');

    function ArsenalCreatePage(params) {
        var self = this;

        self.publishClicked = function() {
            
            $('#save-modal').modal();
        };

        self.sortClicked = function() {

            $(document).trigger("arsenalSortClicked");
        };

        self.randomClicked = function() {
            
            $('#random-modal').modal();
        };
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalCreatePage.prototype.dispose = function() {
    };

    return {viewModel: ArsenalCreatePage, template: templateMarkup};

});
