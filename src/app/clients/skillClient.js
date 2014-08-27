/*global define */
'use strict';

define(function(require) {
    
    var rsvp = require('rsvp');
    var expiringStore = require('/../app/lib/expiringStore.js');
    
    var getAll = function(dto) {
        
        return new rsvp.Promise(function(resolve, reject) {
            
            var skills = expiringStore.get('skills');

            if (skills) {
                dto.data.skills = skills;
                resolve(dto);
                return;
            }

            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/skills',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        expiringStore.set('skills', response.data, 86400000); // Expire after 24 hours
                        dto.data.skills = response.data;
                        resolve(dto);
                    } else {
                        reject('Error fetching data.');
                    }
                },
                error: function(jqXHR) {
                    reject(jqXHR);
                }
            });
        });
    };

    return {
        getAll: getAll
    };
});