angular.module("myApp").component("navbar", {
  templateUrl: "navbar/navbar.template.html",
  controller: function () {
    this.navbarWidth = "20%";

    // Function to toggle the width when the bars icon is clicked
    this.toggleWidth = function () {
      // Adjust the width based on your requirement, here set to 5%
      this.navbarWidth = this.navbarWidth === "3%" ? "20%" : "3%";
      this.showIcons = !this.showIcons;
      this.showBars = !this.showBars;
    };
  },
});
