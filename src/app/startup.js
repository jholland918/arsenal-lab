define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('arsenal:cost-chart', { require: 'components/arsenal/cost-chart/cost-chart' });
  
  ko.components.register('arsenal:create-page', { require: 'components/arsenal/create-page/create-page' });
  
  ko.components.register('arsenal:edit-page', { require: 'components/arsenal/edit-page/edit-page' });
  
  ko.components.register('arsenal:header', { require: 'components/arsenal/header/header' });
  
  ko.components.register('arsenal:list', { require: 'components/arsenal/list/list' });
  
  ko.components.register('arsenal:random-modal', { require: 'components/arsenal/random-modal/random-modal' });
  
  ko.components.register('arsenal:save-modal', { require: 'components/arsenal/save-modal/save-modal' });
  
  ko.components.register('arsenal:show-page', { require: 'components/arsenal/show-page/show-page' });
  
  ko.components.register('arsenal:skills-modal', { require: 'components/arsenal/skills-modal/skills-modal' });

  ko.components.register('browse:index-page', { require: 'components/browse/index-page/index-page' });
  
  ko.components.register('browse:filter-modal', { require: 'components/browse/filter-modal/filter-modal' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
