define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./arsenal-list.html');
    var skillClient = require('/../app/clients/skillClient.js');
    var arsenalClient = require('/../app/clients/arsenalClient.js');
    var arsenalHelper = require('/../app/lib/arsenalHelper.js');
    var arsenalConverter = require('/../app/lib/arsenalConverter.js');
    var arsenalRandomizer = require('/../app/lib/arsenalRandomizer.js');

    function ArsenalList(params) {

        var self = this;
        self.skills = null;
        self.arsenalItems = ko.observableArray();
        self.currentSchools = null;

        self.arsenalItems.subscribe(function(changedArsenal) {

            arsenalHelper.updateChart(changedArsenal);
        });

        arsenalHelper.initMetaPopovers();

        $(document).on("arsenalSaveClicked", function(event, params) {

            var payload = params.saveFormData;

            payload.push({
                "name": "config",
                "value": arsenalConverter.buildArsenalConfig(self.arsenalItems())
            });

            var dto = {
                lastInsertId: null,
                payload: payload
            };

            arsenalClient.save(dto)
                    .then(self.updateAfterSave)
                    .catch(function(error) {
                        if (_.has(error, 'alert')) {
                            var errorModal = $('#error-modal');
                            errorModal.find('.modal-body').html(error.alert.join('<br>'));
                            errorModal.modal();
                        } else {
                            alert(JSON.stringify(error));
                        }
                    });
        });

        self.updateAfterSave = function(dto) {
            var url = window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/#/arsenal/' + dto.lastInsertId;
            window.location = url;
        };

        $(document).on("arsenalSortClicked", function(event) {
            var sortedArsenal = arsenalHelper.arsenalSort(self.arsenalItems());
            self.arsenalItems(sortedArsenal);
        });

        $(document).on("randomFormSubmitted", function(event, params) {

            var randomArsenal = arsenalRandomizer.execute(self.skills, params.randomFormData);
            var newArsenal = arsenalConverter.buildNewArsenalById(randomArsenal, self.skills);
            var sortedArsenal = arsenalHelper.arsenalSort(newArsenal);
            self.arsenalItems(sortedArsenal);
            
//            debugger;
            
            var schools = [];

            _(randomArsenal).forEach(function(skillId) {

                var foundSkill = _.find(self.skills, function(skill) {
                    return skill.id === skillId;
                });
                
                schools.push(foundSkill.school);
            });
            
            self.currentSchools = _.without(_.uniq(schools), '');

            $(document).trigger("schoolsUpdated", {currentSchools: self.currentSchools});
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

            var errors = validateSkillSelection(params);

            if (errors.length > 0) {

                var errorModal = $('#error-modal');
                errorModal.find('.modal-body').html(errors.join('<br>'));
                errorModal.modal();
                return;
            }

            addNewSkills(params);

            $(document).trigger("schoolsUpdated", {currentSchools: self.currentSchools});
        });

        var addNewSkills = function(params) {
            var quantity = params.quantity;
            var skillSelected = params.skillSelected;
            var arsenalSkill = params.arsenalSkill;

            for (var i = 0; i < quantity; i++) {

                var index1 = null;
                var index2 = null;

                if (i === 0) {
                    index1 = arsenalSkill.index1;
                    index2 = arsenalSkill.index2;
                } else {
                    var result = getUnassignedItem(arsenalSkill.index1, arsenalSkill.index2, 'after');

                    if (result.success) {
                        index1 = result.index1;
                        index2 = result.index2;
                    } else {
                        result = getUnassignedItem(arsenalSkill.index1, arsenalSkill.index2, 'before');

                        if (result.success) {

                            index1 = result.index1;
                            index2 = result.index2;
                        } else {
                            alert('Problem finding open arsenal slot.');
                            break;
                        }
                    }
                }

                var newArsenalSkill = {
                    index1: index1,
                    index2: index2,
                    skill: skillSelected,
                    cssNames: 'btn btn-default btn-block skill ' + skillSelected.type.toLowerCase() + ' ' + skillSelected.school.toLowerCase()
                };

                self.arsenalItems()[index1][index2](newArsenalSkill);
            }

            arsenalHelper.updateChart(self.arsenalItems());
        };

        /**
         * @param {type} direction values may be 'before' or 'after'
         */
        var getUnassignedItem = function(index1, index2, direction) {

            var ix2Init;
            var result = {
                success: false,
                index1: null,
                index2: null
            };

            if (direction === 'after') {

                ix2Init = index2 + 1;

                for (var ix1 = index1; ix1 < 3; ix1++) {

                    for (var ix2 = ix2Init; ix2 < 10; ix2++) {

                        if (self.arsenalItems()[ix1][ix2]().skill.type === 'Aura') {
                            result.success = true;
                            result.index1 = ix1;
                            result.index2 = ix2;
                            break;
                        }
                    }

                    ix2Init = 0;

                    if (result.success) {
                        break;
                    }
                }
            } else if (direction === 'before') {

                ix2Init = index2 - 1;

                for (var ix1 = index1; ix1 >= 0; ix1--) {

                    for (var ix2 = ix2Init; ix2 >= 0; ix2--) {

                        if (self.arsenalItems()[ix1][ix2]().skill.type === 'Aura') {
                            result.success = true;
                            result.index1 = ix1;
                            result.index2 = ix2;
                            break;
                        }
                    }

                    ix2Init = 9;

                    if (result.success) {
                        break;
                    }
                }
            }

            return result;
        };

        var validateSkillSelection = function(params) {

            var errors = [];

            var skills = arsenalHelper.extractArsenalSkills(self.arsenalItems());

            var originalSchools = _.without(_.uniq(_.pluck(skills, 'school')), '');

            var quantity = params.quantity;
            var skillSelected = params.skillSelected;
            var arsenalSkill = params.arsenalSkill;

            // Clear the arsenal skill that was initially selected
            var foundSkillIndex = _.findIndex(skills, function(skill) {

                return skill.skill_number === arsenalSkill.skill.skill_number;
            });

            skills[foundSkillIndex] = {skill_number: 0, school: ''};

            // Add new skills
            for (var i = 0; i < quantity; i++) {

                skills.push(skillSelected);
            }

            // Validate new skill set
            var schools = _.without(_.uniq(_.pluck(skills, 'school')), '');

            if (schools.length > 3) {
                errors.push('Maximum schools exceeded, arsenal contains ' + originalSchools.join(', ') + '. Cannot add skill with ' + skillSelected.school + ' school.');
            }

            var count = _.countBy(skills, function(skill) {

                if (skill.skill_number === skillSelected.skill_number) {
                    return 'matched';
                }
            });

            if (count.matched > 3) {
                errors.push('Arsenal can contain a maximum of 3 copies of each skill. Maximum exceeded (' + count.matched + ').');
            }

            if (errors.length === 0) {
                self.currentSchools = schools;
            }

            return errors;
        };

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

                        var arsenalItems = arsenalConverter.buildArsenal(dto.data.arsenal, self.skills);
                        self.arsenalItems(arsenalItems);
                    })
                    .catch(function(error) {
                        alert(error);
                    });
        } else {

            var arsenal = initArsenal(self.skills);
            var newArsenal = arsenalConverter.buildNewArsenal(arsenal, self.skills);
            self.arsenalItems(newArsenal);
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

    return {viewModel: ArsenalList, template: templateMarkup};
});
