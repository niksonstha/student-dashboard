angular.module("myApp").component("studentList", {
  templateUrl: "student-list/student-list.template.html",
  controller: function studentController($http) {
    var self = this;
    $http.get("students/student.json").then(function (response) {
      if (response.data) {
        self.students = response.data;
        console.log(self.students);

        self.gridOptions = {
          enableSorting: true,
          columnDefs: [
            { field: "Name", displayName: "Name" },
            { field: "age", displayName: "Age" },
            { field: "Grade", displayName: "Grade" },
            { field: "Major", displayName: "Major" },
          ],
          data: self.students,
        };
      } else {
        console.error("No data found in the response.");
      }
    });
  },
});
