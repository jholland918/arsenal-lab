/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var arsenalClient = require('arsenal-lab/app/clients/arsenalClient');
    var arsenalHelper = require('arsenal-lab/app/viewModels/helpers/arsenalHelper');
    var arsenalRandomizer = require('arsenal-lab/app/viewModels/helpers/arsenalRandomizer');

    var ArsenalCreate = function(dto) {

        var self = this;

        self.skills = dto.data.skills;
        var arsenal = initArsenal(self.skills);

        arsenalHelper.initMetaPopovers();

        var defaultSkill = {
            index1: null,
            index2: null,
            skill: self.skills[0]
        };

        // Initialize skillClicked with a skill so binding won't break.
        self.currentArsenalSkill = ko.observable(defaultSkill);
        self.skillSelected = ko.observable(defaultSkill);
        self.arsenalSkills = ko.observableArray(buildNewArsenalSkills(arsenal, self.skills));
        self.modalSkills = ko.observableArray(arsenalHelper.buildModalSkills(self.skills, true));
        self.skillMeta = ko.observable('');

        self.arsenalSkills.subscribe(function(changedArsenal) {
            
            arsenalHelper.updateChart(changedArsenal);
        });
        
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

            var sortedArsenal = arsenalHelper.arsenalSort(self.arsenalSkills());

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
            arsenalHelper.updateChart(self.arsenalSkills());
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
                        alert(JSON.stringify(error));
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

            return self['isVisible' + school]();
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

        self.randomClicked = function() {
            $('#random-modal').modal();
        };

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

            var randomArsenal = arsenalRandomizer.execute(self.skills, options);

            var newArsenalSkills = buildNewArsenalSkillsById(randomArsenal, self.skills);

            var sortedArsenal = arsenalHelper.arsenalSort(newArsenalSkills);

            self.arsenalSkills(sortedArsenal);

            $('#random-modal').modal('hide');
        };
    };

    var initArsenal = function(skills) {
        var arsenal = sessionStorage.getItem('arsenal');

        if (arsenal) {
            arsenal = JSON.parse(arsenal);
        } else {

            var auraSkillNumber = '0';
            var entryIndex = _.findIndex(skills, {'skill_number': auraSkillNumber});

            arsenal = [];
            var length = 30;

            for (var i = 0; i < length; i++) {
                arsenal[i] = entryIndex;
            }

            sessionStorage.setItem('arsenal', JSON.stringify(arsenal));
        }

        return arsenal;
    };

    var buildNewArsenalSkills = function(arsenal, skills) {
        var arsenalSkills = [[], [], []];

        _(arsenal).forEach(function(skillIndex, index) {

            var index1;
            if (index >= 0 && index <= 9) {
                index1 = 0;
            } else if (index >= 10 && index <= 19) {
                index1 = 1;
            } else {
                index1 = 2;
            }

            var skill = skills[skillIndex];

            var arsenalSkill = {
                index1: index1,
                index2: arsenalSkills[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalSkills[index1].push(ko.observable(arsenalSkill));
        });

        return arsenalSkills;
    };

    var buildNewArsenalSkillsById = function(arsenal, skills) {
        var arsenalSkills = [[], [], []];

        _(arsenal).forEach(function(skillId, index) {

            var index1;
            if (index >= 0 && index <= 9) {
                index1 = 0;
            } else if (index >= 10 && index <= 19) {
                index1 = 1;
            } else {
                index1 = 2;
            }

            var skill = _.find(skills, function(obj) {
                return obj.id === skillId;
            });

            var arsenalSkill = {
                index1: index1,
                index2: arsenalSkills[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalSkills[index1].push(ko.observable(arsenalSkill));
        });

        return arsenalSkills;
    };

    return ArsenalCreate;
});