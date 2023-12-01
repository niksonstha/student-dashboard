var myApp = angular.module("myApp", ["ui.grid", "ui.router"]);
myApp.config(function ($stateProvider) {
  var studentsDetailState = {
    name: "studentDetail",
    url: "/studentDetail",
    template: "<h1>I am detail page</h1>",
  };

  $stateProvider.state(studentsDetailState);
});
