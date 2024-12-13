// Array to hold cart items
let cart = [];

// Check for existing cart data in localStorage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
}

// Function to handle Add to Cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        // Increase quantity if the product is already in the cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({ ...product, quantity: 1 });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in the UI
    updateCartCount();
    alert(`${product.name} has been added to your cart!`);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.btn-outline-success').forEach((button, index) => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const product = {
            name: card.querySelector('.card-title').textContent,
            price: parseFloat(card.querySelector('.card-text').textContent.replace('₱ ', '').replace(',', '')),
            image: card.querySelector('img').src
        };
        addToCart(product);
    });
});

// Fetch the products from the API (or local JSON)
fetch('products.json')  // Use your actual API endpoint if needed
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('product-list'); // Ensure this element exists in HTML

    // Loop through each product and generate the HTML for the product grid
    data.forEach((product) => {
      // --- Product Grid ---
      const productDiv = document.createElement('div');
      productDiv.classList.add('col-md-4', 'mb-4', 'mt-4'); // Bootstrap classes for layout

      // Create the product card
      const card = document.createElement('div');
      card.classList.add('card');

      // Add the product image
      const img = document.createElement('img');
      img.src = product.image;
      img.classList.add('card-img-top');
      img.alt = product.name;
      card.appendChild(img);

      // Add the card body with product details
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = product.name;
      cardBody.appendChild(title);

      const price = document.createElement('p');
      price.classList.add('card-text');
      price.textContent = `${product.price.toLocaleString()} P`;  // Corrected price formatting
      cardBody.appendChild(price);

      // Add a stock status
      const stockStatus = document.createElement('div');
      stockStatus.classList.add('tag');
      stockStatus.textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
      stockStatus.classList.add(product.stock > 0 ? 'in-stock' : 'out-of-stock');
      cardBody.appendChild(stockStatus);

      // Add action buttons
      const addToCartButton = document.createElement('button');
      addToCartButton.classList.add('btn', 'btn-block', 'btn-outline-success');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.disabled = product.stock === 0;  // Disable if out of stock
      cardBody.appendChild(addToCartButton);

      const viewSpecsButton = document.createElement('button');
      viewSpecsButton.classList.add('btn', 'btn-block', 'btn-outline-danger');
      viewSpecsButton.textContent = 'View Full Specs';
      cardBody.appendChild(viewSpecsButton);

      card.appendChild(cardBody);
      productDiv.appendChild(card);
      productList.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error loading products:', error));