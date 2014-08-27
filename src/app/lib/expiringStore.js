/*global define */
'use strict';

define(function(require) {

    var store = require('store');

    /**
     * 
     * @param {type} key identifier for value
     * @param {type} val value to store
     * @param {type} exp time in milliseconds to keep data
     * @returns void
     */
    var set = function(key, val, exp) {

        store.set(key, {val: val, exp: exp, time: new Date().getTime()});
    };

    var get = function(key) {

        var info = store.get(key);

        if (!info) {

            return null;
        }

        if (new Date().getTime() - info.time > info.exp) {

            return null;
        }

        return info.val;
    };

    return {
        get: get,
        set: set
    };
});