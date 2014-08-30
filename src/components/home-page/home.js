define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
  }

  return { viewModel: HomeViewModel, template: homeTemplate };

});
