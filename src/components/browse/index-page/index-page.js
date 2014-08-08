define(['knockout', 'text!./index-page.html'], function(ko, templateMarkup) {

  function IndexPage(params) {
    this.message = ko.observable('Hello from the index-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  IndexPage.prototype.dispose = function() { };
  
  return { viewModel: IndexPage, template: templateMarkup };

});
