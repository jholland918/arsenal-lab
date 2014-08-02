/*global define */
'use strict';

define(function(require) {

    var padNumber = function(number, pad) {
        number = parseInt(number, 10);
        var N = Math.pow(10, pad);
        return number < N ? ("" + (N + number)).slice(1) : "" + number;
    }

    return {
        padNumber: padNumber
    };
});