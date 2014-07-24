'use strict';

require.config({
    //dev//urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: '/',
    paths: {
        text: 'arsenal-lab/bower_components/requirejs-text/text',
        knockout: 'arsenal-lab/bower_components/knockoutjs/dist/knockout'
    }
});

$('#nav-create').click(function(event) {
    // Quick 'n dirty fix for knockoutjs error: "Error You cannot apply bindings
    // multiple times to the same element" until I can figure it out. :(
    event.preventDefault();
    window.location.replace('/arsenal-lab/arsenal/create');
});

page('/arsenal-lab/', function() {

    require(['arsenal-lab/app/controllers/mainController'], function(mainController) {

        mainController.index();
    });
});

page('/arsenal-lab/arsenal/create', function() {

    require(['arsenal-lab/app/controllers/arsenalController'], function(arsenalController) {
        arsenalController.create();
    });
});

page('/arsenal-lab/arsenal/edit/:id', function(ctx) {

    require(['arsenal-lab/app/controllers/arsenalController'], function(arsenalController) {
        arsenalController.edit(ctx.params.id);
    });
});

page('/arsenal-lab/arsenal/:id', function(ctx) {

    require(['arsenal-lab/app/controllers/arsenalController'], function(arsenalController) {
        arsenalController.show(ctx.params.id);
    });
});

page('*', function() {

    $('#shell').html('<h1>404 - Page not found</h1>');
});

page();
