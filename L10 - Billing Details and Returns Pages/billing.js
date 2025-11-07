var app = angular.module("storeApp", []);

app.controller("BillingController", function($scope, $http) {
  $scope.billing = {};
  $scope.cartItems = [
    { name: "T-Shirt", price: 20 },
    { name: "Sneakers", price: 75 },
    { name: "Cap", price: 15 }
  ];

  $scope.getTotal = function() {
    return $scope.cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  $scope.submitBilling = function() {
    if (!validateBilling($scope.billing)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Create billing JSON
    var billingJSON = {
      name: $scope.billing.name,
      address: $scope.billing.address,
      payment: {
        cardNumber: maskCard($scope.billing.cardNumber),
        expiry: $scope.billing.expiry
      },
      total: $scope.getTotal()
    };

    // AJAX call
    $http.post("http://localhost:3000/api/billing", billingJSON)
      .then(response => {
        alert("Billing submitted successfully!");
      })
      .catch(error => {
        alert("Error submitting billing details.");
      });
  };
});

// Helper functions
function validateBilling(b) {
  return b.name && b.address && /^[0-9]{16}$/.test(b.cardNumber) && /^[0-9]{2}\/[0-9]{2}$/.test(b.expiry);
}

function maskCard(num) {
  return "**** **** **** " + num.slice(-4);
}
