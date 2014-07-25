/*global define */
'use strict';

define(function(require) {

    var execute = function(skills, options) {

        var randomArsenal;

        var caseSize = getCaseSize(options.caseSize);

        var schools = getSchools(options.schools, caseSize);
        
        var auraSkill = getAuraSkill(skills);

        skills = filterAuraFromSkills(skills);

        skills = filterSkillsBySchool(skills, schools);

        skills = filterSkillsByAttackRange(skills, options.attackRanges);
        
        var shuffledSkills = shuffleSkills(skills);

        randomArsenal = buildArsenal(shuffledSkills, auraSkill, options.typeMinimums);
        
        return _.pluck(randomArsenal, 'id');
    };

    var getCaseSize = function(caseSizeInput) {

        var caseSize;

        if (caseSizeInput >= 1 && caseSizeInput <= 3) {
            caseSize = caseSizeInput;
        } else {
            caseSize = getRandomInt(1, 3);
        }

        return caseSize;
    };

    var getSchools = function(schoolsInput, caseSize) {

        var schools = [];

        if (schoolsInput.length <= caseSize) {

            schools = schoolsInput;

        } else {

            for (var i = 0; i < caseSize; i++) {

                var index = getRandomIndex(schoolsInput);
                schools.push(schoolsInput[index]);
                schoolsInput.splice(index, 1);
            }
        }

        return schools;
    };

    var getAuraSkill = function(skills) {

        var auraSkill = _.find(skills, function(skill) {
            return skill.type === 'Aura'
        });

        return auraSkill;
    };

    var filterAuraFromSkills = function(skills) {

        return skills = _.without(skills, _.findWhere(skills, {type: 'Aura'}));
    };

    var filterSkillsBySchool = function(skills, schools) {

        skills = _.filter(skills, function(skill) {

            var hasSchool = false;
            if (_.indexOf(schools, skill.school) >= 0) {
                hasSchool = true;
            }

            return hasSchool;
        });

        return skills;
    };

    var filterSkillsByAttackRange = function(skills, attackRanges) {

        // Getting the options not selecting looks a bit odd here. But I'm doing
        // this because there are some wildcard ranges that could be stored in
        // the database in weird notations and I still want to potentially include 
        // them in an arsenal result.
        var attackRangeOptions = ['all', 'mine', 'short', 'medium', 'long'];
        var attackRangesNotChosen = _.difference(attackRangeOptions, attackRanges);

        _(attackRangesNotChosen).forEach(function(attackRange) {
            skills = _.without(skills, _.findWhere(skills, {distance: attackRange}));
        });

        return skills;
    };

    var shuffleSkills = function(skills) {

        // Since you can have up to three skills per arsenal, I'm duplicating
        // the skills in this skill "pool" here. It seems a bit simpler to do 
        // than keep a running count of each skill added to the random arsenal...
        // ...dots.......sarcastic dot...
        var skillPool = [];

        for (var i = 0; i < 3; i++) {
            _(skills).forEach(function(skill) {
                skillPool.push(skill);
            });
        }

        return _.shuffle(skillPool);
    };

    var buildArsenal = function(shuffledSkills, auraSkill, typeMinimums) {

        var randomArsenal = [];
        var arsenalCounter = {
            total: 0
        };

        buildArsenalMinimums(randomArsenal, arsenalCounter, typeMinimums, shuffledSkills, auraSkill);

        buildAuraByRandomCount(randomArsenal, arsenalCounter, auraSkill, typeMinimums);

        buildArsenalRandoms(randomArsenal, arsenalCounter, shuffledSkills, auraSkill);

        return randomArsenal;
    };

    var buildArsenalMinimums = function(randomArsenal, arsenalCounter, typeMinimums, shuffledSkills, auraSkill) {

        var typeKeys = _.keys(typeMinimums);

        _(typeKeys).forEach(function(typeKey) {

            var minimum = parseInt(typeMinimums[typeKey], 10) || 0;

            if (typeKey === 'Aura') {

                for (var i = 0; i < minimum; i++) {
                    randomArsenal.push(auraSkill);
                    arsenalCounter.total++;
                }
            } else {
                
                for (var i = 0; i < minimum; i++) {

                    var index = _.findIndex(shuffledSkills, {'type': typeKey});
                    randomArsenal.push(shuffledSkills[index]);
                    shuffledSkills.splice(index, 1);
                    arsenalCounter.total++;
                }
            }
        });
    };

    var buildAuraByRandomCount = function(randomArsenal, arsenalCounter, auraSkill, typeMinimums) {

        // After initial minimums are satisfied, now provision aura if it 
        // wasn't given (is supposed to be random).
        if (!typeMinimums.Aura) {

            var remainingArsenalSlots = 30 - arsenalCounter.total;
            var numOfAuraToAdd = getRandomInt(1, remainingArsenalSlots);

            for (var i = 0; i < numOfAuraToAdd; i++) {

                randomArsenal.push(auraSkill);
                arsenalCounter.total++;
            }
        }
    };

    var buildArsenalRandoms = function(randomArsenal, arsenalCounter, shuffledSkills) {
        var remainingOpenEntries = 30 - arsenalCounter.total;

        for (var i = 0; i < remainingOpenEntries; i++) {
            randomArsenal.push(shuffledSkills[i]);
        }
    };

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var getRandomIndex = function(inputArray) {
        return Math.floor(Math.random() * inputArray.length);
    };

    return {
        execute: execute
    };
});