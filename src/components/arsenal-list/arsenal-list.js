define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./arsenal-list.html');
    var skillClient = require('/../app/clients/skillClient.js');
    var arsenalClient = require('/../app/clients/arsenalClient.js');
    var arsenalHelper = require('/../app/helpers/arsenalHelper.js');
    var arsenalRandomizer = require('/../app/helpers/arsenalRandomizer.js');

    function ArsenalList(params) {

        var self = this;

        self.skills = null;
        self.arsenalSkills = ko.observableArray();
        
        self.arsenalSkills.subscribe(function(changedArsenal) {
            
            arsenalHelper.updateChart(changedArsenal);
        });

        arsenalHelper.initMetaPopovers();

        $(document).on("arsenalSaveClicked", function(event, params) {

            var payload = params.saveFormData;

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
        });

        self.updateAfterSave = function(dto) {

            var url = window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal-show/' + dto.lastInsertId;

            window.location = url;
        };

        $(document).on("arsenalSortClicked", function(event) {
            var sortedArsenal = arsenalHelper.arsenalSort(self.arsenalSkills());

            self.arsenalSkills(sortedArsenal);
        });

        $(document).on("randomFormSubmitted", function(event, params) {

            var randomArsenal = arsenalRandomizer.execute(self.skills, params.randomFormData);
            
            debugger;

            var newArsenalSkills = arsenalHelper.buildNewArsenalSkillsById(randomArsenal, self.skills);

            var sortedArsenal = arsenalHelper.arsenalSort(newArsenalSkills);

            self.arsenalSkills(sortedArsenal);
        });

        if (params.mode === 'show') {
            self.arsenalSkillClicked = function() {
                return;
            };
        } else {
            self.arsenalSkillClicked = function(arsenalSkill) {
                $(document).trigger("arsenalSkillClicked", {arsenalSkill: arsenalSkill});
            };
        }

        $(document).on("skillConfirmClicked", function(event, params) {

            var skillSelected = params.skillSelected;
            var arsenalSkill = params.arsenalSkill;

            var index1 = arsenalSkill.index1;
            var index2 = arsenalSkill.index2;

            var newArsenalSkill = {
                index1: index1,
                index2: index2,
                skill: skillSelected,
                cssNames: 'btn btn-default btn-block skill ' + skillSelected.type.toLowerCase() + ' ' + skillSelected.school.toLowerCase()
            };

            self.arsenalSkills()[index1][index2](newArsenalSkill);
            arsenalHelper.updateChart(self.arsenalSkills());
        });

        var dto = {
            self: self,
            params: params,
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

        if (dto.params.arsenalId > 0) {

            var dto = {
                payload: {
                    arsenalId: dto.params.arsenalId
                },
                data: []
            };

            arsenalClient.getById(dto)
                    .then(function(dto) {

                        var arsenalSkills = arsenalHelper.buildArsenalSkills(dto.data.arsenal, self.skills);

                        self.arsenalSkills(arsenalSkills);
                    })
                    .catch(function(error) {
                        alert(error);
                    });

        } else {

            var arsenal = initArsenal(self.skills);

            var newArsenalSkills = buildNewArsenalSkills(arsenal, self.skills);

            self.arsenalSkills(newArsenalSkills);
        }
    };

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ArsenalList.prototype.dispose = function() {
        $(document).off("skillConfirmClicked");
        $(document).off("randomFormSubmitted");
        $(document).off("arsenalSortClicked");
        $(document).off("arsenalSaveClicked");
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

    return {viewModel: ArsenalList, template: templateMarkup};

});
