// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        //"bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "bootstrap":            "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "rsvp":                 "//cdn.jsdelivr.net/rsvp/3.0.6/rsvp.amd.min",
        "lodash":               "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min",
        "store":                "//cdnjs.cloudflare.com/ajax/libs/store.js/1.3.14/store.min"
    },
    shim: {
        "bootstrap": { deps: ["jquery", "lodash"] }
    }
};
