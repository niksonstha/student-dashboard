angular
  .module("myApp")
  .filter("mapGender", mapGender) // Register the filter
  .component("studentList", {
    templateUrl: "student-list/student-list.template.html",
    controller: function studentController($http, uiGridConstants) {
      var self = this;

      self.highlightFilteredHeader = function (
        row,
        rowRenderIndex,
        col,
        colRenderIndex
      ) {
        if (col.filters[0].term) {
          return "header-filtered";
        } else {
          return "";
        }
      };

      // Initialize grid options
      self.gridOptions = {
        enableFiltering: true,
        columnDefs: [
          {
            field: "name",
            headerCellClass: self.highlightFilteredHeader,
          },
          { field: "age", headerCellClass: self.highlightFilteredHeader },
          { field: "grade", headerCellClass: self.highlightFilteredHeader },
          { field: "major", headerCellClass: self.highlightFilteredHeader },
          {
            field: "gender",
            filter: {
              type: uiGridConstants.filter.SELECT,
              selectOptions: [
                { value: "1", label: "male" },
                { value: "2", label: "female" },
              ],
            },

            cellFilter: "mapGender", // Use the mapGender filter
            headerCellClass: self.highlightFilteredHeader,
          },
        ],
        data: [], // Initialize with empty data
      };

      // Fetch data using $http
      $http.get("students/student.json").then(function (response) {
        if (response.data) {
          self.gridOptions.data = response.data; // Assign data to the grid
          var genderCounts = {
            male: 0,
            female: 0,
          };

          response.data.forEach(function (student) {
            if (student.gender === 1) {
              genderCounts.male++;
            } else if (student.gender === 2) {
              genderCounts.female++;
            }
          });

          // Assuming you have a canvas element with id="genderChart" in your HTML

          var ctx = document.getElementById("genderChart").getContext("2d");
          var genderChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "Gender Distribution",
                  data: [genderCounts.male, genderCounts.female],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.5)", // Color for male
                    "rgba(255, 99, 132, 0.5)", // Color for female
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Students",
                    color: "white",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Gender",
                    color: "white",
                  },
                },
              },
              // Additional chart options can be set here
            },
          });
        } else {
          console.error("No data found in the response.");
        }
      });
    },
  });

// Define the mapGender filter function
function mapGender() {
  var genderHash = {
    1: "male",
    2: "female",
  };

  return function (input) {
    if (!input) {
      return "";
    } else {
      return genderHash[input];
    }
  };
}
