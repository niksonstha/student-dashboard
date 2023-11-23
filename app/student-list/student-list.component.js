//this is a short way to decalare your components and initialize them
//your issue previously was that the html component <student-list></student-list>
//was not properly binded to the controller
//whenever using "-" sign we have to use camelCase in the controller to represent the component
//i.e. student-list when binding to component will be studentList
//your navbar was working because there was not "-" symbol there
angular.module('myApp').component('studentList', {
  templateUrl: "student-list/student-list.template.html",
  controller: function () {
    this.name = "Nikson Shrestha"
  }
});