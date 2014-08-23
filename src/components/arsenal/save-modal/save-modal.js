define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./save-modal.html');
    var bootstrapTags = require('bootstrap-tags');
    var tagClient = require('/../app/clients/tagClient.js');

    function SaveModal(params) {

        var self = this;

        self.saveModal = $('#save-modal');

        self.saving = false;

        self.saveArsenal = function() {

            self.saving = true;

            self.saveModal.modal('hide');
        };

        self.saveModal.on('hidden.bs.modal', function(e) {
            if (self.saving) {

                var saveFormData = $('#save-form').serializeArray();

                saveFormData.push({
                    "name": "arsenal_tags",
                    "value": $('#arsenal-tags').tags().getTags()
                });

                $(document).trigger("arsenalSaveClicked", {saveFormData: saveFormData});
            }
        });
        
        self.initArsenalTags = function(dto) {
            // The bootstrap-tags library doesn't work well when it inits an
            // element on a hidden area of a page so I have to init this element
            // upon modal display for now.
            // http://maxwells.github.io/bootstrap-tags.html
            $('#arsenal-tags').tags({
                tagSize: "lg",
                //suggestions: ["alpha", "alpha2", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india"],
                suggestions: dto.data.tagNames,
                excludeList: ["fuck", "shit"],
                caseInsensitive: true,
                promptText: "Enter Tags",
                maxNumTags: 5
            });
        };

        self.saveModal.on('shown.bs.modal', function(e) {
            
            var dto = {
                data: []
            };

            tagClient.getTagNames(dto)
                    .then(self.initArsenalTags)
                    .catch(function(error) {
                        alert(JSON.stringify(error));
                    });
        });

        $(document).on("arsenalPublishClicked", function(event, params) {
            $('#save-modal').modal();

        });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    SaveModal.prototype.dispose = function() {
        this.saveModal.off("hidden.bs.modal");
        this.saveModal.off("shown.bs.modal");
        $(document).off("arsenalPublishClicked");
    };

    return {viewModel: SaveModal, template: templateMarkup};

});
