/*global define */
'use strict';

define(function(require) {

    var getAll = function(dto) {
        
        return new RSVP.Promise(function(resolve, reject) {

            var skills = store.get('skills');

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
                        store.set('skills', response.data);
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