// import { CartManager } from "./cart.js";

// const cartManager = new CartManager();

// function renderCart() {
//     const cartItems = document.getElementById("cart-items");
//     const cartTotal = document.getElementById("cart-total");

//     cartItems.innerHTML = "";
//     cartManager.cart.forEach(item => {
//         const itemDiv = document.createElement("div");
//         itemDiv.className = "cart-item";
//         itemDiv.innerHTML = `
//             <img src="${item.image}" alt="${item.title}" style="height: 100px;">
//             <h3>${item.title}</h3>
//             <p>$${item.price} x ${item.quantity}</p>
//             <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
//             <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
//             <button onclick="removeItem(${item.id})">Remove</button>
//         `;
//         cartItems.appendChild(itemDiv);
//     });

//     cartTotal.innerText = cartManager.getCartTotal().toFixed(2);
// }

// function updateQuantity(productId, quantity) {
//     if (quantity < 1) return;
//     cartManager.updateQuantity(productId, quantity);
//     renderCart();
// }

// function removeItem(productId) {
//     cartManager.removeItem(productId);
//     renderCart();
// }

// function checkout() {
//     cartManager.checkout();
//     renderCart();
//     alert("Order placed successfully! Thank you for shopping with us.");
// }

// // Render the cart on page load
// renderCart();

//######################################################################################################################
// The issue with your cartPage.js is that the updateQuantity, removeItem, and checkout functions are defined in the global scope, but they are not accessible to the inline onclick handlers in your dynamically generated HTML.To fix this, you need to attach event listeners to the buttons programmatically instead of using inline onclick.

import { CartManager } from "./cart.js";

const cartManager = new CartManager();

// Render the cart items
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    // cartManager.cart.forEach(item => {
    //     const itemDiv = document.createElement("div");
    //     itemDiv.className = "cart-item";
    //     itemDiv.innerHTML = `
    //         <img src="${item.image}" alt="${item.title}" style="height: 100px;">
    //         <h3>${item.title}</h3>
    //         <p>$${item.price} x ${item.quantity}</p>
    //         <button class="quantity-decrease" data-id="${item.id}">-</button>
    //         <button class="quantity-increase" data-id="${item.id}">+</button>
    //         <button class="remove-item" data-id="${item.id}">Remove</button>
    //     `;
    //     cartItems.appendChild(itemDiv);
    // });

    cartManager.cart.forEach(item => {
        let card = document.createElement("div");
        card.className = "card";
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="height: 100px;">
            <h3>${item.title}</h3>
            <p>$${item.price} x ${item.quantity}</p>
            
            `;
        let btns = document.createElement("div");
        console.log(btns)
        btns.className = "btns";
        btns.innerHTML = `<button class="quantity-decrease" data-id="${item.id}">-</button>
            <button class="quantity-increase" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
        card.append(itemDiv, btns)
        // itemDiv.append(btns)
        cartItems.appendChild(card);
    });
    





    // Update the total price
    cartTotal.innerText = cartManager.getCartTotal().toFixed(2);

    // Attach event listeners to buttons
    attachEventListeners();
}

// Attach event listeners to buttons
function attachEventListeners() {
    // Decrease quantity
    document.querySelectorAll(".quantity-decrease").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"));
            const item = cartManager.cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });

    // Increase quantity
    document.querySelectorAll(".quantity-increase").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"));
            const item = cartManager.cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });

    // Remove item
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"));
            removeItem(productId);
        });
    });

    // Checkout button
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", checkout);
    }
}

// Update the quantity of a product in the cart
function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    cartManager.updateQuantity(productId, quantity);
    renderCart(); // Re-render the cart
}

// Remove a product from the cart
function removeItem(productId) {
    cartManager.removeItem(productId);
    renderCart(); // Re-render the cart
}

// Checkout: Clear the cart and display a confirmation message
function checkout() {
    cartManager.checkout();
    renderCart(); // Re-render the cart
    alert("Order placed successfully! Thank you for shopping with us.");
}

// Render the cart on page load
renderCart();