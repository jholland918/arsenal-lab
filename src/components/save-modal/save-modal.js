define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./save-modal.html');

    function SaveModal(params) {

        var self = this;

        self.saveModal = $('#save-modal');
        
        self.saving = false;

        self.saveArsenal = function() {
            
            self.saving = true;

            self.saveModal.modal('hide');
        };
       
        self.saveModal.on('hidden.bs.modal', function(e) {
            if(self.saving) {
                $(document).trigger("arsenalSaveClicked", {saveFormData: $('#save-form').serializeArray()});
            }
        });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    SaveModal.prototype.dispose = function() {
        this.saveModal.off("hidden.bs.modal");
    };

    return {viewModel: SaveModal, template: templateMarkup};

});
