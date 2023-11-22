// Update your AngularJS module to include the controller
var studentlist = angular.module("student-list", []);

studentlist.component("student-list", {
  templateUrl: "./student-list/student-list.template.html",
  controller: "StudentController",
});

// Define the controller
studentlist.controller("StudentController", function () {
  this.name = "nikson";
});
