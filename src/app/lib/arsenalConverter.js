/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var skillsHelper = require('/../app/lib/skillsHelper.js');
    var arsenalHelper = require('/../app/lib/arsenalHelper.js');

    var buildArsenalConfig = function(arsenalItems) {

        var arsenalConfig = [];

        _(arsenalItems).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalItem) {

                arsenalConfig.push(arsenalItem().skill.skill_number);
            });
        });

        arsenalConfig = _.countBy(arsenalConfig, function(skillNumber) {
            return skillNumber;
        });

        return JSON.stringify(arsenalConfig);
    };

    var buildArsenal = function(arsenal, skills) {

        var arsenalConfig = JSON.parse(arsenal.config);

        var arsenalItems = [[], [], []];

        var ix1 = 0;
        var ix2 = 0;

        _(arsenalConfig).forEach(function(count, skillNumber) {

            var skill = _.find(skills, function(obj) {
                return obj.skill_number === skillNumber;
            });

            skill.meta = skillsHelper.buildSkillMetaItem(skill);
            
            var cssNames = 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase();

            for (var i = 0; i < count; i++) {

                var arsenalItem = {
                    index1: ix1,
                    index2: ix2,
                    skill: skill,
                    cssNames: cssNames
                };

                arsenalItems[ix1][ix2] = ko.observable(arsenalItem);

                if (ix2 === 9) {
                    ix2 = 0;
                    ix1++;
                } else {
                    ix2++;
                }
            }
        });
        
        return arsenalHelper.arsenalSort(arsenalItems);
    };

    var buildNewArsenal = function(arsenal, skills) {

        var arsenalItems = [[], [], []];

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

            var arsenalItem = {
                index1: index1,
                index2: arsenalItems[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalItems[index1].push(ko.observable(arsenalItem));
        });

        return arsenalItems;
    };

    var buildNewArsenalById = function(arsenal, skills) {
        var arsenalItems = [[], [], []];

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

            skill.meta = skillsHelper.buildSkillMetaItem(skill);

            var arsenalItem = {
                index1: index1,
                index2: arsenalItems[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalItems[index1].push(ko.observable(arsenalItem));
        });

        return arsenalItems;
    };

    return {
        buildArsenalConfig: buildArsenalConfig,
        buildArsenal: buildArsenal,
        buildNewArsenal: buildNewArsenal,
        buildNewArsenalById: buildNewArsenalById
    };
});