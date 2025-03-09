import { CartManager } from "./cart.js";

class ProductManager {
    constructor() {
        this.products = [];
    }

    async fetchProducts() {
        try {
            let response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) throw new Error("Failed to fetch products");
            this.products = await response.json();
        } catch (err) {
            console.error(err.message);
            window.location.href = "error.html";
        }
    }

    getProductById(id) {
        return this.products.find(product => product.id == id);
    }

    getAllCategories() {
        let cat = this.products.map((value) => value.category);
        return [...new Set(cat)];
    }

    getProductsByCategory(categoryName) {
        return this.products.filter(value => value.category == categoryName);
    }

    fetchPaginatedProducts(page, size = 5) {
        let startValue = (page - 1) * size;
        let endValue = startValue + size;
        return this.products.slice(startValue, endValue);
    }
}
class UIManager extends ProductManager {
    constructor() {
        super();
        this.cartManager = new CartManager();
    }

    async initProducts() {
        await super.fetchProducts();
        this.renderHomePage();
        this.updateCartCount(); // Initialize cart count
    }

    renderHomePage() {
        let allCategories = super.getAllCategories();
        let container = document.querySelector(".container");

        allCategories.forEach((category) => {
            let card = document.createElement("div");
            card.className = "card";
            let categoryh3 = document.createElement("h1");
            categoryh3.innerText = category;
            card.append(categoryh3);

            let myProducts = super.getProductsByCategory(category);
            let productDiv = document.createElement("div");
            productDiv.className = "productDiv";

            myProducts.forEach(product => {
                let div = document.createElement("div");
                div.className = "product-card";

                let img = document.createElement("img");
                img.src = product.image;
                img.style.height = "250px";

                let title = document.createElement("h5");
                title.innerText = product.title;

                let price = document.createElement("p");
                price.innerText = `$${product.price}`;

                let addToCartButton = document.createElement("button");
                addToCartButton.innerText = "Add to Cart";

                addToCartButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.cartManager.addItem(product);
                    this.updateCartCount(); // Update cart count
                    console.log("Product added to cart:", product.title);
                });

                div.addEventListener("click", () => {
                    localStorage.setItem("productId", JSON.stringify(product.id));
                    window.location.href = "product.html";
                });

                div.append(img, title, price, addToCartButton);
                productDiv.append(div);
            });

            card.append(productDiv);
            container.append(card);
        });
    }

    // Update the cart count displayed in the header
    // updateCartCount() {
    //     const cartCount = document.getElementById("cart-count");
    //     const cartBadge = document.getElementById("cart-badge");
    //     if (cartCount && cartBadge) { // Fixed typo: cartBadge instead of cartBadge
    //         const count = this.cartManager.cart.length;
    //         cartCount.innerText = count;
    //         cartBadge.innerText = count;
    //     }
    // }
    updateCartCount() {
        const cartBadge = document.getElementById("cart-badge"); // Target the badge span
        if (cartBadge) {
            const count = this.cartManager.cart.length;
            cartBadge.innerText = count; // Update the badge value
        }
    }
}

const ui = new UIManager();
ui.initProducts();