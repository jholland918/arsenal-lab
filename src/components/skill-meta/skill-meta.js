define(['knockout', 'text!./skill-meta.html'], function(ko, templateMarkup) {

  function SkillMeta(params) {
    this.message = ko.observable('Hello from the skill-meta component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  SkillMeta.prototype.dispose = function() { };
  
  return { viewModel: SkillMeta, template: templateMarkup };

});
