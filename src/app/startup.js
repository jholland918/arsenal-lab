define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('arsenal-list', { require: 'components/arsenal-list/arsenal-list' });

  ko.components.register('arsenal-create-page', { require: 'components/arsenal-create-page/arsenal-create-page' });

  ko.components.register('arsenal-edit-page', { require: 'components/arsenal-edit-page/arsenal-edit-page' });

  ko.components.register('arsenal-show-page', { require: 'components/arsenal-show-page/arsenal-show-page' });

  ko.components.register('random-modal', { require: 'components/random-modal/random-modal' });

  ko.components.register('skills-modal', { require: 'components/skills-modal/skills-modal' });

  ko.components.register('save-modal', { require: 'components/save-modal/save-modal' });

  ko.components.register('cost-chart', { require: 'components/cost-chart/cost-chart' });

  ko.components.register('arsenal-header', { require: 'components/arsenal-header/arsenal-header' });


  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
