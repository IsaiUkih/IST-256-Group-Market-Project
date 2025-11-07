/* ============================================================
   IST 256 - Project Alpha: Web Storefront (Shipping Selection)
   Group Members:
   - Isaiah Ukih – HTML Structure & Integration
   - Logan VonGuden – CSS Styling & Visual Design
   - Alexander Tysak – JavaScript Logic, JSON Handling, AJAX
   - Daniel Weeks – Bootstrap Layout, AngularJS, jQuery Behaviors
   ============================================================ */

// AngularJS App Setup
const app = angular.module("shippingApp", []);
app.controller("ShippingController", function($scope) {
  $scope.message = "Please fill in your shipping details below.";
});

// jQuery behaviors and form validation
$(document).ready(function() {
  $("#shippingForm").on("submit", function(e) {
    e.preventDefault();

    // Field validation
    let valid = true;
    $("#shippingForm input, #shippingForm select").each(function() {
      if ($(this).val() === "") valid = false;
    });

    if (!valid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create JSON object from form input
    const shippingDetails = {
      address: $("#address").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      zip: $("#zip").val(),
      carrier: $("#carrier").val(),
      method: $("input[name='method']:checked").val()
    };

    console.log("Shipping JSON:", shippingDetails);

    // Show success message
    $("#result")
      .removeClass("d-none")
      .text("✅ Shipping details saved successfully!");

    // Simulate AJAX POST to mock REST API
    $.ajax({
      url: "https://example.com/api/shipping", // mock endpoint
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(shippingDetails),
      success: function(response) {
        console.log("Data sent successfully:", response);
      },
      error: function() {
        console.warn("Mock API: Request simulated, no actual server call.");
      }
    });
  });
});
