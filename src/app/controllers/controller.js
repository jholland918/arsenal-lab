/*global define */
'use strict';

define(function(require) {

    var renderView = function(dto) {

        return new RSVP.Promise(function(resolve, reject) {
            
            var viewName;

            if (_.isString(dto)) {
                viewName = dto;
            } else if (_.has(dto, 'viewName')) {
                viewName = dto.viewName;
            }
            
            if(!viewName) {
                reject('View name is required.');
            }

            require(['text!arsenal-lab/app/views/' + viewName + '.html'], function(text) {
                $('#shell').html(text);
                resolve(dto);
            });
        });
    };

    // Not sure if I need this anymore or if it still works...
    var readView = function(view) {

        if (_.isArray(view)) {

            return readStaticArray(view);
        }

        var promise = new RSVP.Promise(function(resolve, reject) {

            require(['text!arsenal-lab/app/views/' + view + '.html'], function(text) {
                resolve(text);
            });
        });

        return promise;
    };

    // Not sure if I need this anymore or if it still works...
    var readViewArray = function(viewPaths) {

        var promise = new RSVP.Promise(function(resolve, reject) {
            var moduleNames = [];

            _(viewPaths).forEach(function(val) {
                moduleNames.push('text!app/views/' + val + '.html');
            });

            require(moduleNames, function() {

                var text = {};

                _(arguments).forEach(function(val, index) {
                    text[viewPaths[index]] = val;
                });

                resolve(text);
            });
        });

        return promise;
    };

    return {
        renderView: renderView,
        readView: readView,
        readViewArray: readViewArray
    };
});