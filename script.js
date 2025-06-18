
document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const errorMessage = document.getElementById("error-message");
  
    // Load all products on page load
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => displayProducts(data.products))
      .catch((err) => {
        productList.innerHTML = "<p>Error loading products.</p>";
        console.error(err);
      });
  
    // Handle search
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (query === "") {
        errorMessage.textContent = "Please enter a search term.";
        return;
      }
  
      errorMessage.textContent = "";
  
      fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.products || data.products.length === 0) {
            productList.innerHTML = "<p>No products found.</p>";
          } else {
            displayProducts(data.products);
          }
        })
        .catch((err) => {
          productList.innerHTML = "<p>Error fetching search results.</p>";
          console.error(err);
        });
    });
  
    function displayProducts(products) {
      productList.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Price:</strong> $${product.price}</p>
        `;
        productList.appendChild(card);
      });
    }
  });
  