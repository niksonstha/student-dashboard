var myApp = angular.module("myApp", ["ui.grid", "ui.router"]);
myApp.config(function ($stateProvider) {
  var studentsDetailState = {
    name: "studentDetail",
    url: "/studentDetail",
    component: "studentDetail",
  };

  $stateProvider.state(studentsDetailState);
});
