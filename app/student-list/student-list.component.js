angular.module("myApp").component("studentList", {
  templateUrl: "student-list/student-list.template.html",
  controller: function studentController($http) {
    var self = this;
    $http.get("students/student.json").then(function (response) {
      if (response.data) {
        self.myData = response.data;
        console.log(self.myData);
      } else {
        console.error("No data found in the response.");
      }
    });
  },
});
