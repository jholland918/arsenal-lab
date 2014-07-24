/*global define */
'use strict';

define(function(require) {

    var controller = require('arsenal-lab/app/controllers/controller');

    var index = function() {

        controller.renderView('main/index').catch(function(error) {
            alert(error);
        });
    };

    return {
        index: index
    };
});