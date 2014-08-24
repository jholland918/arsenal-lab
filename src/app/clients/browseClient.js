/*global define */
'use strict';

define(["rsvp"], function(rsvp) {

    var filter = function(dto) {
        
        return new rsvp.Promise(function(resolve, reject) {
            
            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/browse/filter',
                data: dto.payload,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.data.arsenals = response.data;
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
    
    var latest = function(dto) {
        
        return new rsvp.Promise(function(resolve, reject) {
            
            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/browse/latest',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.data.arsenals = response.data;
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
        filter: filter,
        latest: latest
    };
});