angular.module("myApp").component("studentList", {
  templateUrl: "student-list/student-list.template.html",
  controller: function studentController($http) {
    var self = this;
    $http.get("students/student.json").then(function (response) {
      self.students = response.data;
      console.log(self.students);
    });
  },
});
