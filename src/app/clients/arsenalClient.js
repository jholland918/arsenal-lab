/*global define */
'use strict';

define(["rsvp"], function(rsvp) {

    var getAll = function(dto) {

        return new rsvp.Promise(function(resolve, reject) {
            
            debugger;

            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/arsenals',
                dataType: 'json',
                success: function(response) {
                    debugger;
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

    var getById = function(dto) {
        
        return new rsvp.Promise(function(resolve, reject) {

            $.ajax({
                type: 'GET',
                url: '/arsenal-lab/api/arsenals/' + dto.payload.arsenalId,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.data.arsenal = response.data;
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

    var save = function(dto) {

        return new rsvp.Promise(function(resolve, reject) {

            $.ajax({
                type: 'POST',
                url: '/arsenal-lab/api/arsenals',
                data: dto.payload,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        dto.lastInsertId = response.data.lastInsertId;
                        resolve(dto);
                    } else {
                        reject({alert: response.error});
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
        getById: getById,
        save: save
    };
});