
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');


// Hardcoded products

const products = [
    { id: 1, name: "Blue Jeans", price: 999 },
    { id: 2, name: "Denim Jacket", price: 1499 },
    { id: 3, name: "White T-Shirt", price: 499 },
    { id: 4, name: "Sports Shoes", price: 1999 },
    { id: 5, name: "Handbag", price: 1299 },
    { id: 6, name: "Casual Dress", price: 1799 },
    { id: 7, name: "Wrist Watch", price: 899 },
    { id: 8, name: "Casual Top", price: 699 }
];


// Load cart from local storage

let cart = JSON.parse(localStorage.getItem('cart')) || [];

displayCart();


// Function to add product to cart

function addToCart(id) {

    const product = products.find((p) => p.id === id);

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    displayCart();

}


// Function to save cart

function saveCart() {

    localStorage.setItem('cart', JSON.stringify(cart));

}


// Function to increase quantity

function increaseQuantity(id) {

    const item = cart.find((item) => item.id === id);

    if (item) {
        item.quantity++;
    }

    saveCart();
    displayCart();

}


// Function to decrease quantity

function decreaseQuantity(id) {

    const item = cart.find((item) => item.id === id);

    if (item) {

        item.quantity--;

        if (item.quantity === 0) {
            cart = cart.filter((item) => item.id !== id);
        }

    }

    saveCart();
    displayCart();

}


// Function to remove product

function removeItem(id) {

    cart = cart.filter((item) => item.id !== id);

    saveCart();
    displayCart();

}


// Function to display cart items

function displayCart() {

    cartItems.innerHTML = '';

    if (cart.length === 0) {

        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty!</p>';

    }

    cart.forEach((item) => {

        const div = document.createElement('div');

        div.className = 'cart-item';

        div.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Subtotal: ₹${item.price * item.quantity}</p>
            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.id})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">+</button>

            </div>

            <button class="remove-btn" onclick="removeItem(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    updateTotal();

}


// Function to update total price and cart count

function updateTotal() {

    let total = 0;
    let count = 0;

    cart.forEach((item) => {

        total = total + (item.price * item.quantity);

        count = count + item.quantity;

    });

    totalPrice.textContent = total;

    cartCount.textContent = count;

}


// Function for checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

    }
    else {

        alert("Order placed successfully!");

        cart = [];

        saveCart();
        displayCart();

    }

}