var myApp = angular.module("myApp", ["ui.grid", "ui.router"]);
myApp.config(function ($stateProvider) {
  var dashboardState = {
    name: "dashboard",
    url: "/dashboard",
    component: "studentList",
  };
  var studentsDetailState = {
    name: "studentDetail",
    url: "/studentDetail",
    component: "studentDetail",
  };

  $stateProvider.state(studentsDetailState);
  $stateProvider.state(dashboardState);
});
