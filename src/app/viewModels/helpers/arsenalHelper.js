/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');

    var sortSkills = function(modalSkills, params) {

        var skills = [];

        _(modalSkills()).forEach(function(skillGroup) {

            _(skillGroup).forEach(function(skill) {

                skills.push(skill);
            });
        });

        var sortedSkills;

        if (params.length === 1) {

            sortedSkills = _(skills).chain()
                    .sortBy(function(skill) {
                        return skill[params[0]];
                    }).value();

        } else if (params.length === 2) {

            sortedSkills = _(skills).chain()
                    .sortBy(function(skill) {
                        return skill[params[1]];
                    })
                    .sortBy(function(skill) {
                        return skill[params[0]];
                    }).value();

        } else if (params.length === 3) {

            sortedSkills = _(skills).chain()
                    .sortBy(function(skill) {
                        return skill[params[2]];
                    })
                    .sortBy(function(skill) {
                        return skill[params[1]];
                    })
                    .sortBy(function(skill) {
                        return skill[params[0]];
                    }).value();

        } else {
            return;
        }

        return buildModalSkills(sortedSkills, false);
    };

    var buildArsenalConfig = function(arsenalSkills) {

        var arsenalConfig = [];

        _(arsenalSkills).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalSkill) {

                var arsenalEntry = {
                    ix1: arsenalSkill().index1,
                    ix2: arsenalSkill().index2,
                    id: arsenalSkill().skill.id
                };

                arsenalConfig.push(JSON.stringify(arsenalEntry));
            });
        });

        return arsenalConfig;
    };

    var buildModalSkills = function(skills, init) {
        var modalSkills = [
            [], [], [], [], [], [], []
        ];

        var typeIndex = {
            Aura: 0,
            Attack: 1,
            Defense: 2,
            Erase: 3,
            Status: 4,
            Special: 5,
            Environment: 6
        };

        if (init === true) {
            _(skills).forEach(function(skill) {
                skill.cssNames = 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase();
                skill.meta = buildSkillMetaItem(skill);
                modalSkills[typeIndex[skill.type]].push(skill);
            });
        } else {
            _(skills).forEach(function(skill) {
                modalSkills[typeIndex[skill.type]].push(skill);
            });
        }

        return modalSkills;
    };

    var buildSkillMetaItem = function(skill) {
        var html = '';

        var skillUse = '&infin;';
        if (skill.use != 0) {
            skillUse = skill.use;
        }

        var skillRarity = skill.rarity;

        var rarityStars = {
            "1": "&#9733;",
            "2": "&#9733;&#9733;",
            "3": "&#9733;&#9733;&#9733;",
            "4": "&#9733;&#9733;&#9733;&#9733;",
            "5": "&#9733;&#9733;&#9733;&#9733;&#9733;",
            "5+": "&#9733;&#9733;&#9733;&#9733;&#9733;+"
        };

        if (_.has(rarityStars, skillRarity)) {
            skillRarity = rarityStars[skillRarity];
        }

        var strDef = '';

        switch (skill.type) {
            case 'Attack':
                strDef = ' STR ' + skill.str_def;
                break;
            case 'Defense':
                strDef = ' DEF ' + skill.str_def;
                break;
        }

        html += '<div class="panel panel-default">';
        html += '<div class="panel-heading">' + skill.name + '</div>';
        html += '<div class="panel-body">';
        html += '<p class="skill-stats">COST ' + skill.cost + strDef + ' @ ' + skillUse + ' ' + skill.distance + '</p>';
        html += '<p class="skill-desc">' + skill.skill_text + '</p>';
        html += '</div>';
        html += '</div>';
        html += '<div class="skill-info"><table class="table table-condensed table-hover skill-table">';
        html += '<tr><th>ID</th><td>: ' + skill.skill_number + '</td>';
        html += '<th>Rarity</th><td>: ' + skillRarity + '</td></tr>';
        html += '</table>';

        if (skill.notes) {
            html += '<p>' + skill.notes + '</p>';
        }

        html += '</div></div>';
        html += '</div>';

        return html;
    };

    var buildArsenalSkills = function(arsenal, skills) {

        var arsenalConfig = JSON.parse('[' + arsenal.config + ']');

        var arsenalSkills = [[], [], []];

        _(arsenalConfig).forEach(function(item) {

            var skill = _.find(skills, function(obj) {
                return obj.id === item.id;
            });

            skill.meta = buildSkillMetaItem(skill);

            var arsenalSkill = {
                index1: item.ix1,
                index2: item.ix2,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            arsenalSkills[item.ix1][item.ix2] = ko.observable(arsenalSkill);
        });

        return arsenalSkills;
    };

    var arsenalSort = function(arsenalSkills) {

        var skills = [];

        _(arsenalSkills).forEach(function(arsenalGroup) {

            _(arsenalGroup).forEach(function(arsenalSkill) {

                skills.push(arsenalSkill().skill);
            });
        });

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

        var sortedArsenalSkills = [[], [], []];

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
                index2: sortedArsenalSkills[index1].length,
                skill: skill,
                cssNames: 'btn btn-default btn-block skill ' + skill.type.toLowerCase() + ' ' + skill.school.toLowerCase()
            };

            sortedArsenalSkills[index1].push(ko.observable(arsenalSkill));
        });

        return sortedArsenalSkills;
    };

    var initMetaPopovers = function() {
        
        var popOverSettings = {
            placement: 'bottom',
            container: '#shell',
            html: true,
            selector: '[rel="meta"]',
            trigger: 'hover',
            delay: {show: 500, hide: 100}
        };

        $('body').popover(popOverSettings);
    };

    return {
        buildArsenalConfig: buildArsenalConfig,
        buildModalSkills: buildModalSkills,
        buildArsenalSkills: buildArsenalSkills,
        arsenalSort: arsenalSort,
        sortSkills: sortSkills,
        initMetaPopovers: initMetaPopovers
    };
});