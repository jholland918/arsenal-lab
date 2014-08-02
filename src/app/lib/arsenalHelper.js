/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');

    var updateChart = function(arsenalItems) {

        var arsenalCosts = [];

        _(arsenalItems).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalItem) {

                if (arsenalItem().skill.type !== 'Aura') {
                    arsenalCosts.push(arsenalItem().skill.cost);
                }
            });
        });

        var arsenalCostCounts = _.countBy(arsenalCosts, function(num) {
            return num;
        });

        var maxValue = _.max(_.values(arsenalCostCounts));

        $(".bar").each(function(index) {

            var height = arsenalCostCounts[index] / maxValue * 100;
            $(this).attr('data-original-title', arsenalCostCounts[index]).animate({height: height}, 600);
        });

        $('.bar-chart .bar').tooltip();
    };
   
    var extractArsenalSkills = function(arsenalItems) {
        var skills = [];

        _(arsenalItems).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalItem) {

                skills.push(arsenalItem().skill);
            });
        });
        
        return skills;
    };

    var arsenalSort = function(arsenalItems) {

        var skills = extractArsenalSkills(arsenalItems);

        var typeSort = {
            Attack: 1,
            Defense: 2,
            Erase: 3,
            Status: 4,
            Special: 5,
            Environment: 6,
            Aura: 7,
        };

        var sortedSkills = _(skills).chain().sortBy(function(skill) {
            return skill.name;
        }).sortBy(function(skill) {
            return typeSort[skill.type];
        }).value();

        var sortedArsenal = [[], [], []];

        _(sortedSkills).forEach(function(skill, index) {

            var index1;
            if (index >= 0 && index <= 9) {
                index1 = 0;
            } else if (index >= 10 && index <= 19) {
                index1 = 1;
            } else {
                index1 = 2;
            }

            var arsenalSkill = {
                index1: index1,
                index2: sortedArsenal[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            sortedArsenal[index1].push(ko.observable(arsenalSkill));
        });

        return sortedArsenal;
    };

    var initMetaPopovers = function() {

        var popOverSettings = {
            placement: 'bottom',
            container: '#page',
            html: true,
            selector: '[rel="meta"]',
            trigger: 'hover',
            delay: {show: 500, hide: 100}
        };

        $('body').popover(popOverSettings);
    };

    return {
        arsenalSort: arsenalSort,
        extractArsenalSkills: extractArsenalSkills,
        initMetaPopovers: initMetaPopovers,
        updateChart: updateChart
    };
});