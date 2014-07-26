/*global define */
'use strict';

define(function(require) {

    var ko = require('knockout');
    var arsenalHelper = require('arsenal-lab/app/viewModels/helpers/arsenalHelper');

    var ArsenalShow = function(dto) {
        
        var self = this;
        
        arsenalHelper.initMetaPopovers();

        self.arsenalSkills = arsenalHelper.buildArsenalSkills(dto.data.arsenal, dto.data.skills);

        self.author = dto.data.arsenal.author;
        self.created_date = dto.data.arsenal.created_date;
        self.description = dto.data.arsenal.description;
        self.url = window.location.protocol + '//' + window.location.hostname + '/arsenal-lab/arsenal/' + dto.data.arsenal.id;
        self.name = dto.data.arsenal.name;

        self.editClicked = function() {
            // Ideally I would just use a regular link but I was getting a 
            // knockout error of "Error You cannot apply bindings multiple times 
            // to the same element" so I'm using this workaround for now.
            window.location.replace('/arsenal-lab/arsenal/edit/' + dto.payload.arsenalId);
        };
    };

    return ArsenalShow;
});