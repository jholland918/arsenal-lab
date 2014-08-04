define(['knockout', 'text!./arsenal-header.html'], function(ko, templateMarkup) {

    function ArsenalHeader(params) {

        var self = this;

        self.psychoVisible = ko.observable(false);
        self.opticalVisible = ko.observable(false);
        self.natureVisible = ko.observable(false);
        self.kiVisible = ko.observable(false);
        self.faithVisible = ko.observable(false);

        self.arsenalCaseSrc = ko.observable('/arsenal-lab/img/cases/arsenal_case_1_140.png');

        $(document).on("schoolsUpdated", function(event, params) {
            
            var currentSchools = params.currentSchools;

            if (_.indexOf(currentSchools, 'Psycho') > -1) {
                self.psychoVisible(true);
            } else {
                self.psychoVisible(false);
            }

            if (_.indexOf(currentSchools, 'Optical') > -1) {
                self.opticalVisible(true);
            } else {
                self.opticalVisible(false);
            }

            if (_.indexOf(currentSchools, 'Nature') > -1) {
                self.natureVisible(true);
            } else {
                self.natureVisible(false);
            }

            if (_.indexOf(currentSchools, 'Ki') > -1) {
                self.kiVisible(true);
            } else {
                self.kiVisible(false);
            }

            if (_.indexOf(currentSchools, 'Faith') > -1) {
                self.faithVisible(true);
            } else {
                self.faithVisible(false);
            }
            
            switch (currentSchools.length) {
                case 1:
                    self.arsenalCaseSrc('/arsenal-lab/img/cases/arsenal_case_1_140.png');
                    break;
                case 2:
                    self.arsenalCaseSrc('/arsenal-lab/img/cases/arsenal_case_2_140.png');
                    break;
                case 3:
                    self.arsenalCaseSrc('/arsenal-lab/img/cases/arsenal_case_3_140.png');
                    break;
            }
        });
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalHeader.prototype.dispose = function() {
        $(document).off("schoolsUpdated");
    };

    return {viewModel: ArsenalHeader, template: templateMarkup};

});
