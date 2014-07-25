/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var arsenalClient = require('arsenal-lab/app/clients/arsenalClient');
    var arsenalHelper = require('arsenal-lab/app/viewModels/helpers/arsenalHelper');

    var ArsenalEdit = function(dto) {

        var self = this;
        var skills = dto.data.skills;

        var defaultSkill = {
            index1: null,
            index2: null,
            skill: skills[0]
        };

        // Initialize skillClicked with a skill so binding won't break.
        self.currentArsenalSkill = ko.observable(defaultSkill);
        self.skillSelected = ko.observable(defaultSkill);
        self.arsenalSkills = ko.observableArray(arsenalHelper.buildArsenalSkills(dto.data.arsenal, skills));
        self.modalSkills = ko.observableArray(arsenalHelper.buildModalSkills(skills, true));
        self.skillMeta = ko.observable('');

        self.arsenalSkillClicked = function(arsenalSkill) {

            self.currentArsenalSkill(arsenalSkill);
            $('#skill-modal').modal();
        };

        self.skillClicked = function(skill) {

            var arsenalSkill = {
                index1: null,
                index2: null,
                skill: skill
            };

            self.skillSelected(arsenalSkill);
        };

        self.sortClicked = function() {

            var sortedArsenal = arsenalHelper.arsenalSort(self.arsenalSkills);

            self.arsenalSkills(sortedArsenal);
        };

        self.confirmClicked = function() {
            $('#skill-modal').modal('hide');

            var index1 = self.currentArsenalSkill().index1;
            var index2 = self.currentArsenalSkill().index2;

            var skill = self.skillSelected().skill;

            var newArsenalSkill = {
                index1: index1,
                index2: index2,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };
            self.arsenalSkills()[index1][index2](newArsenalSkill);
        };

        self.publishClicked = function() {
            $('#save-modal').modal();
        };

        self.saveArsenal = function() {

            var payload = $('#save-form').serializeArray();

            payload.push({
                "name": "config",
                "value": arsenalHelper.buildArsenalConfig(self.arsenalSkills())
            });

            var dto = {
                lastInsertId: null,
                payload: payload
            };

            arsenalClient.save(dto)
                    .then(self.updateAfterSave)
                    .catch(function(error) {
                        alert(error);
                    });

            $('#save-modal').modal('hide');
        };

        self.updateAfterSave = function(dto) {
            window.location.replace('/arsenal-lab/arsenal/' + dto.lastInsertId);
        };

        self.skillMouseOver = function(skill) {
            self.skillMeta(skill.meta);
        };

        self.schoolIsVisible = function(school) {

            return self['isVisible' + school.trim()]();
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

        self.bindSortPopover = function() {

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
        }();
        
        self.showInfo = function(arsenalEntry) {
            $('#skill-meta').html(arsenalEntry.skill.meta);
        };
    };

    return ArsenalEdit;
});