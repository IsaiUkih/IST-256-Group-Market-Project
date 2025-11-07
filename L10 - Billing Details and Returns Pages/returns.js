var app = angular.module("storeApp", []);

app.controller("ReturnsController", function($scope, $http) {
  $scope.products = [
    { name: "T-Shirt", price: 20 },
    { name: "Sneakers", price: 75 },
    { name: "Cap", price: 15 }
  ];

  $scope.selectProduct = function(p) {
    $scope.selectedProduct = p;
    $scope.return = {};
  };

  $scope.submitReturn = function() {
    if (!$scope.return.reason || !$scope.return.condition) {
      alert("Please complete all return fields.");
      return;
    }

    var returnJSON = {
      product: $scope.selectedProduct.name,
      price: $scope.selectedProduct.price,
      reason: $scope.return.reason,
      condition: $scope.return.condition
    };

    $http.post("http://localhost:3000/api/returns", returnJSON)
      .then(response => {
        alert("Return submitted successfully!");
      })
      .catch(error => {
        alert("Error submitting return.");
      });
  };
});

// jQuery product search (enhanced filter)
$(document).ready(function() {
  $("#searchProduct").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".list-group-item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
