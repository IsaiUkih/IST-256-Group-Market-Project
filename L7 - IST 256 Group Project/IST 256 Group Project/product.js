/* ==============================================
   Team Code Catalysts: Product Management Page
   IST 256, Section 001
   Group Members:
   - Isaiah Ukih
   - Logan Kale VonGunden
   - Daniel Weeks
   - Alexander Tysak
   Date: Fall 2025
================================================= */

$(document).ready(function() {
  // Load existing products from localStorage or initialize empty array
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Function to update the JSON display and render delete buttons
  function updateDisplay() {
    const display = $("#productJSON");
    display.empty();

    if (products.length === 0) {
      display.text("No products added yet.");
      return;
    }

    // Create formatted JSON display with delete buttons
    products.forEach((p, index) => {
      const productCard = $(`
        <div class="card mb-2 shadow-sm p-3 bg-light">
          <pre>${JSON.stringify(p, null, 2)}</pre>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        </div>
      `);
      display.append(productCard);
    });
  }

  // Initial display when page loads
  updateDisplay();

  // Add or Update Product
  $("#productForm").on("submit", function(e) {
    e.preventDefault();

    const productId = $("#productId").val().trim();
    const description = $("#description").val().trim();
    const category = $("#category").val().trim();
    const unit = $("#unit").val().trim();
    const price = $("#price").val().trim();
    const weight = $("#weight").val().trim();

    // Validation checks
    if (!productId || !description || !category || !unit || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }

    // Create new product object
    const newProduct = {
      productId,
      description,
      category,
      unit,
      price: parseFloat(price),
      weight: weight || "N/A"
    };

    // Check if product already exists
    const existingIndex = products.findIndex(p => p.productId === productId);

    if (existingIndex >= 0) {
      products[existingIndex] = newProduct;
      alert("Product updated successfully!");
    } else {
      products.push(newProduct);
      alert("Product added successfully!");
    }

    // Save to localStorage for persistence
    localStorage.setItem("products", JSON.stringify(products));

    // Update display
    updateDisplay();

    // Reset form
    $("#productForm")[0].reset();
  });

  // Delete Product (delegated event since buttons are dynamically created)
  $("#productJSON").on("click", ".delete-btn", function() {
    const index = $(this).data("index");
    const confirmDelete = confirm(`Are you sure you want to delete product "${products[index].productId}"?`);

    if (confirmDelete) {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      updateDisplay();
      alert("Product deleted successfully!");
    }
  });

  // Search Product by ID
  $("#searchBtn").on("click", function() {
    const searchId = $("#searchId").val().trim();
    if (!searchId) {
      alert("Please enter a Product ID to search.");
      return;
    }

    const found = products.find(p => p.productId === searchId);
    if (found) {
      $("#searchResult").text(JSON.stringify(found, null, 2));
    } else {
      $("#searchResult").text("No product found with that ID.");
    }
  });
});
