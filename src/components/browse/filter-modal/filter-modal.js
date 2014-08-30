define(function(require) {

    var ko = require('knockout');
    var templateMarkup = require('text!./filter-modal.html');
    var rsvp = require("rsvp");
    var skillClient = require('/../app/clients/skillClient.js');
    var tagClient = require('/../app/clients/tagClient.js');

    function IndexPage(params) {

        var self = this;

        self.tags = ko.observableArray();

        self.skills = ko.observableArray();

        self.initTags = function(dto) {
            return new rsvp.Promise(function(resolve, reject) {

                self.tags(dto.data.tags);
                resolve(dto);
            });
        };

        self.initSkills = function(dto) {
            return new rsvp.Promise(function(resolve, reject) {

                var skills = dto.data.skills;

                skills = _.without(skills, _.remove(skills, function(skill) {
                    return skill.skill_number == 0;
                }));

                skills = _.sortBy(skills, function(skill) {
                    return skill.name;
                });

                skills.unshift({
                    skill_number: -1,
                    name: 'Any'
                });

                self.skills(skills);

                resolve(dto);
            });
        };

        var dto = {
            data: {
                tags: null,
                skills: null
            }
        };

        tagClient.getAll(dto)
                .then(self.initTags)
                .then(skillClient.getAll)
                .then(self.initSkills)
                .catch(function(error) {
                    alert(JSON.stringify(error));
                });

        self.submit = function() {
            
            var payload = $('#browse-form').serializeArray();

            $(document).trigger("filterSubmitted", {payload: payload});
            
            $('#filter-modal').modal('hide');
        };
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    IndexPage.prototype.dispose = function() {
    };

    return {viewModel: IndexPage, template: templateMarkup};

});
