define(['knockout', 'text!./cost-chart.html'], function(ko, templateMarkup) {

  function CostChart(params) {
    this.message = ko.observable('Hello from the cost-chart component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CostChart.prototype.dispose = function() { };
  
  return { viewModel: CostChart, template: templateMarkup };

});
