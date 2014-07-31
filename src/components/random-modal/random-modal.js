define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./random-modal.html');

    function RandomModal(params) {

        var self = this;

        self.randAura = ko.observable(15);
        self.randAttack = ko.observable();
        self.randDefense = ko.observable();
        self.randEnvironment = ko.observable();
        self.randErase = ko.observable();
        self.randSpecial = ko.observable();
        self.randStatus = ko.observable();

        self.randCount = ko.computed(function() {

            var keys = ['randAura', 'randAttack', 'randDefense', 'randEnvironment', 'randErase', 'randSpecial', 'randStatus'];
            var total = 0;

            _(keys).forEach(function(key) {
                total += parseInt(self[key](), 10) || 0;
            });

            return total;
        }, this);

        self.randomExecuteClicked = function() {

            var form = $('#random-form');

            var schools = [];
            form.find("input:checkbox[name=schools]:checked").each(function()
            {
                schools.push($(this).val());
            });

            var attackRanges = [];
            form.find("input:checkbox[name=attack-range]:checked").each(function()
            {
                attackRanges.push($(this).val());
            });

            var options = {
                caseSize: form.find('input[name=case]:checked').val(),
                schools: schools,
                attackRanges: attackRanges,
                typeMinimums: {
                    Aura: form.find('input[name=aura]').val(),
                    Attack: form.find('input[name=attack]').val(),
                    Defense: form.find('input[name=defense]').val(),
                    Environment: form.find('input[name=environment]').val(),
                    Erase: form.find('input[name=erase]').val(),
                    Special: form.find('input[name=special]').val(),
                    Status: form.find('input[name=status]').val(),
                }
            };
            
            $('#random-modal').modal('hide');
            
            $(document).trigger("randomFormSubmitted", {randomFormData: options});
        };
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    RandomModal.prototype.dispose = function() {
    };

    return {viewModel: RandomModal, template: templateMarkup};

});
