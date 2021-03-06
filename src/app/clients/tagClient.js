/*global define */
'use strict';

define(["rsvp"], function(rsvp) {
    
    var getAll = function(dto) {

        return new rsvp.Promise(function(resolve, reject) {
            
            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/tags',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.data.tags = response.data;
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

    var getTagNames = function(dto) {

        return new rsvp.Promise(function(resolve, reject) {
            
            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/tags/names',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.data.tagNames = response.data;
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
        getAll: getAll,
        getTagNames: getTagNames
    };
});