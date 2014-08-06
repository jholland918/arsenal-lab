define(function(require) {
    
    var ko = require('knockout');
    var templateMarkup = require('text!./edit-page.html');

    function ArsenalEditPage(params) {
        
        this.publishClicked = function() {
            
            $('#save-modal').modal();
        };

        this.sortClicked = function() {

            $(document).trigger("arsenalSortClicked");
        };
        
        this.arsenalId = params.id;
    }
    
    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalEditPage.prototype.dispose = function() {
    };

    return {viewModel: ArsenalEditPage, template: templateMarkup};

});
