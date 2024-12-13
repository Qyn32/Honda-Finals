// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to show the checkout modal
function openCheckoutModal() {
    const checkoutModalElement = document.getElementById('checkoutModal');
    if (checkoutModalElement) {
        const checkoutModal = new bootstrap.Modal(checkoutModalElement, {});
        checkoutModal.show();
    } else {
        console.error("Checkout modal element not found.");
    }
}

// Function to toggle the checkout button based on cart contents
function toggleCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = cart.length === 0;
        checkoutButton.textContent = cart.length === 0 ? 'Cart is empty' : 'Checkout';
    }
}

// Function to render cart items dynamically
function renderCart() {
    const cartItemsContainer = document.querySelector('#cart-items-container tbody');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) {
        console.error("Cart items container or cart total element not found.");
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" width="60"></td>
                <td>${item.name}</td>
                <td>₱ ${item.price.toLocaleString()}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" class="form-control quantity-input" data-index="${index}">
                </td>
                <td>₱ ${subtotal.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                </td>
            </tr>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', row);
    });

    cartTotalElement.textContent = `Total: ₱ ${total.toLocaleString()}`;
    addCartEventListeners(); // Reattach event listeners to new elements
}

// Function to add event listeners for cart items
function addCartEventListeners() {
    // Update quantity
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            cart[index].quantity = parseInt(event.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Re-render the cart
            toggleCheckoutButton(); // Update the checkout button
        });
    });

    // Remove item from cart
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Re-render the cart
            toggleCheckoutButton(); // Update the checkout button
        });
    });
}

// Function to validate form fields
function validateForm() {
    const requiredFields = ['first-name', 'last-name', 'address', 'country', 'state'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else if (field) {
            field.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Function to handle checkout form submission
document.getElementById('checkout-form')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate form fields
    if (!validateForm()) {
        alert("Please fill in all required fields.");
        return;
    }

    // Capture form data (this can be sent to the server)
    const firstName = document.getElementById('first-name')?.value;

    alert(`Thank you for your purchase, ${firstName}! Your cart has been cleared.`);

    // Clear the cart after checkout
    clearCart();

    // Close the modal
    const checkoutModalElement = document.getElementById('checkoutModal');
    if (checkoutModalElement) {
        const checkoutModal = bootstrap.Modal.getInstance(checkoutModalElement);
        if (checkoutModal) {
            checkoutModal.hide(); // Close the modal
        }
    }
});

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart'); // Clear cart from localStorage
    cart = []; // Empty the cart array
    renderCart(); // Re-render the cart (it will now be empty)
}

// Initialize cart rendering and checkout button status on page load
document.addEventListener('DOMContentLoaded', function () {
    renderCart(); // Render cart items
    toggleCheckoutButton(); // Enable/disable the checkout button based on cart status
});

// Checkout button click to open the modal
document.getElementById('checkout-button')?.addEventListener('click', function () {
    if (cart.length > 0) {
        openCheckoutModal(); // Open modal if cart is not empty
    } else {
        alert("Your cart is empty. Please add items before proceeding.");
    }
});
