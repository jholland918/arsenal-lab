/*global define */
'use strict';

define(function(require) {
    
    var util = require('/../app/lib/util.js');
   
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

        var skillNumber = util.padNumber(skill.skill_number, 3);

        html += '<div class="panel panel-default">';
        html += '<div class="panel-heading">' + skill.name + ' <span class="skill-id-rarity"><span class="skill-id" title="ID">' + skillNumber + '</span> <span title="Rarity">' + skillRarity + '</span></span></div>';
        html += '<div class="panel-body">';
        html += '<p class="skill-stats">COST ' + skill.cost + strDef + ' @ ' + skillUse + ' ' + skill.distance + '</p>';
        html += '<p class="skill-desc">' + skill.skill_text + '</p>';
        html += '</div></div>';

        return html;
    };
    
    return {
        buildModalSkills: buildModalSkills,
        sortSkills: sortSkills,
        buildSkillMetaItem: buildSkillMetaItem
    };
});