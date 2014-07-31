define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./skills-modal.html');
    var skillClient = require('/../app/clients/skillClient.js');
    var arsenalHelper = require('/../app/helpers/arsenalHelper.js');

    function SkillsModal(params) {

        var self = this;

        self.skills = null;

        self.skillSelected = ko.observable({name: ''});

        self.modalSkills = ko.observableArray([]);

        self.arsenalSkill = null;

        $(document).on("arsenalSkillClicked", function(event, params) {

            $('#skill-modal').modal();

            self.arsenalSkill = params.arsenalSkill;
        });

        self.confirmClicked = function() {

            $('#skill-modal').modal('hide');

            $(document).trigger("skillConfirmClicked", {skillSelected: self.skillSelected(), arsenalSkill: self.arsenalSkill});

            //notnow//arsenalHelper.updateChart(self.arsenalSkills());
        };

        self.isVisibleFaith = ko.observable(true);
        self.toggleVisibleFaith = function() {
            self.isVisibleFaith(!self.isVisibleFaith());
        };

        self.isVisibleKi = ko.observable(true);
        self.toggleVisibleKi = function() {
            self.isVisibleKi(!self.isVisibleKi());
        };

        self.isVisibleNature = ko.observable(true);
        self.toggleVisibleNature = function() {
            self.isVisibleNature(!self.isVisibleNature());
        };

        self.isVisibleOptical = ko.observable(true);
        self.toggleVisibleOptical = function() {
            self.isVisibleOptical(!self.isVisibleOptical());
        };

        self.isVisiblePsycho = ko.observable(true);
        self.toggleVisiblePsycho = function() {
            self.isVisiblePsycho(!self.isVisiblePsycho());
        };

        self.skillClicked = function(skill) {

            self.skillSelected(skill);
        };

        self.skillMouseOver = function(skill) {
            self.skillMeta(skill.meta);
        };

        self.schoolIsVisible = function(school) {

            if (_.has(self, 'isVisible' + school)) {
                return self['isVisible' + school]();
            } else {
                return true;
            }
        };

        self.skillMeta = ko.observable('');
        
        bindSortPopover(self);

        var dto = {
            self: self,
            data: []
        };

        skillClient.getAll(dto)
                .then(init)
                .catch(function(error) {
                    alert(error);
                });
    }

    var init = function(dto) {

        var self = dto.self;

        self.skills = dto.data.skills;

        self.skillSelected(self.skills[0]);

        self.modalSkills(arsenalHelper.buildModalSkills(self.skills, true));
    };

    var bindSortPopover = function(self) {
        
        $('.sort-popover>.trigger').popover({
            html: true,
            title: function() {
                return $(this).parent().find('.head').html();
            },
            content: function() {
                return $(this).parent().find('.content').html();
            }
        });

        $(".sort-popover").on("submit", "form", function(event) {

            event.preventDefault();

            var sort1 = $(this).find('#skill-sort-1').val();
            var sort2 = $(this).find('#skill-sort-2').val();
            var sort3 = $(this).find('#skill-sort-3').val();

            var params = [];

            if (sort1 !== 'none') {
                params.push(sort1);
            }

            if (sort2 !== 'none') {
                params.push(sort2);
            }

            if (sort3 !== 'none') {
                params.push(sort3);
            }

            var sortedModalSkills = arsenalHelper.sortSkills(self.modalSkills, params);

            self.modalSkills(sortedModalSkills);
        });
    };

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    SkillsModal.prototype.dispose = function() {
        $(document).off("arsenalSkillClicked");
    };

    return {viewModel: SkillsModal, template: templateMarkup};

});
