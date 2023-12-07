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

          // Extracting major values from the response data
          var majorLabels = response.data.map(function (student) {
            return student.major;
          });

          // Generate sample data for the chart (number of students for each major)
          var majorCount = {}; // Object to count occurrences of each major
          response.data.forEach(function (student) {
            majorCount[student.major] = (majorCount[student.major] || 0) + 1;
          });
          console.log(majorCount);
          var dataCounts = majorLabels.map(function (major) {
            return majorCount[major] || 0;
          });

          // Create a Chart.js chart after fetching data
          var ctx = document.getElementById("myChart").getContext("2d");
          var myChart = new Chart(ctx, {
            type: "pie",
            data: {
              labels: majorLabels, // Use the extracted major values as labels
              datasets: [
                {
                  label: "Number of Students",
                  data: dataCounts, // Use the generated data counts
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              // Chart.js options
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Number of Students",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Majors",
                  },
                },
              },
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
