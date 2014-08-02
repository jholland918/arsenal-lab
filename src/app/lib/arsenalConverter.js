/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var skillsHelper = require('/../app/lib/skillsHelper.js');

    var buildArsenalConfig = function(arsenalItems) {

        var arsenalConfig = [];

        _(arsenalItems).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalItem) {

                var arsenalEntry = {
                    ix1: arsenalItem().index1,
                    ix2: arsenalItem().index2,
                    id: arsenalItem().skill.id
                };

                arsenalConfig.push(JSON.stringify(arsenalEntry));
            });
        });

        return arsenalConfig;
    };

    var buildArsenal = function(arsenal, skills) {

        var arsenalConfig = JSON.parse('[' + arsenal.config + ']');

        var arsenalItems = [[], [], []];

        _(arsenalConfig).forEach(function(item) {

            var skill = _.find(skills, function(obj) {
                return obj.id === item.id;
            });

            skill.meta = skillsHelper.buildSkillMetaItem(skill);

            var arsenalItem = {
                index1: item.ix1,
                index2: item.ix2,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalItems[item.ix1][item.ix2] = ko.observable(arsenalItem);
        });

        return arsenalItems;
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