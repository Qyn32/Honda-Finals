$(document).ready(function() {
  // Load products when the page loads
  loadProducts();

  // Add or Edit Product Button Clicked
  $('#saveProductBtn').click(function() {
    const productName = $('#productName').val();
    const productPrice = $('#productPrice').val();
    const productStock = $('#productStock').val();
    const productImage = $('#productImage').val();
    const productId = $('#productId').val();  // Check if editing an existing product

    // Create product object
    const product = {
      name: productName,
      price: productPrice,
      stock: productStock,
      image: productImage
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (productId) {
      // Editing an existing product, replace the product at the specified index
      products[productId] = product;
    } else {
      // Adding a new product
      products.push(product);
    }

    // Save the updated list of products in localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Clear form and reload the product list
    $('#productFormContent')[0].reset();
    $('#productForm').modal('hide');
    loadProducts();
  });

  // Load products from localStorage
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = $('#productTable tbody');
    productTableBody.empty();  // Clear the table before adding new rows

    products.forEach((product, index) => {
      productTableBody.append(`
        <tr>
          <td><img src="${product.image}" alt="${product.name}" width="50"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td>
            <button class="btn btn-warning" onclick="editProduct(${index})">Edit</button>
            <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
          </td>
        </tr>
      `);
    });
  }

  // Edit product function
  window.editProduct = function(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products[index];

    $('#productName').val(product.name);
    $('#productPrice').val(product.price);
    $('#productStock').val(product.stock);
    $('#productImage').val(product.image);
    $('#productId').val(index);  // Store the index for the edited product

    $('#productForm').modal('show');
  }

  // Delete product function
  window.deleteProduct = function(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);  // Remove product at index

    // Save the updated products list in localStorage
    localStorage.setItem('products', JSON.stringify(products));

    loadProducts();  // Reload the table
  }
});
