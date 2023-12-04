angular.module("myApp").component("studentDetail", {
  templateUrl: "studentDetails/studentDetail.template.html",
  controller: function studentDetailController($http) {
    var self = this;
    $http
      .get("students/studentDetails.json")
      .then(function (response) {
        self.details = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  },
});
