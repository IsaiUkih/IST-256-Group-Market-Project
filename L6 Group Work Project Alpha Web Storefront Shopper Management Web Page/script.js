/* ==============================================
   Team Code Catalysts: Shopper Management Page
   IST 256, Section 001
   Group Members: 
   - Isaiah Ukih (HTML / Project Manager)
   - Logan Kale VonGunden (CSS / Web Developer)
   - Daniel Weeks (JavaScript / Documentation)
   - Alexander Tysak (Additional Support)
   Date: Fall 2025
================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shopperForm");
  const jsonOutput = document.getElementById("json-output");

  // Array to store multiple shoppers
  let shopperList = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form values
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const address = document.getElementById("address").value.trim();

    // Basic validation
    if (!email || !name || !age || !address) {
      alert("Please fill in all required fields: Email, Name, Age, and Address.");
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      alert("Please enter a valid age greater than 0.");
      return;
    }

    // Create JSON object for this shopper
    const shopper = {
      email: email,
      name: name,
      phone: phone || "N/A",
      age: parseInt(age),
      address: address
    };

    // Add the new shopper to the array
    shopperList.push(shopper);

    // Display all shoppers in JSON format
    jsonOutput.textContent = JSON.stringify(shopperList, null, 2);

    // Optionally reset the form after submit
    form.reset();
  });
});
