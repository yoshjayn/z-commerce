import { CartManager } from "./cart.js";

export class ProductManager {
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
}

class ProductPage {
    constructor() {
        this.productManager = new ProductManager();
        this.cartManager = new CartManager();
    }

    async init() {
        await this.productManager.fetchProducts();
        this.renderProductDetails();
    }

    renderProductDetails() {
        const productId = JSON.parse(localStorage.getItem("productId"));
        const product = this.productManager.getProductById(productId);

        if (!product) {
            window.location.href = "error.html";
            return;
        }

        const productDetails = document.getElementById("product-details");
        productDetails.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.image}" alt="${product.title}" style="height: 300px;">
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <button id="add-to-cart">Add to Cart</button>
            <button onclick="window.location.href='index.html'">Back to Home</button>
        `;

        // Add to Cart button event listener
        const addToCartButton = document.getElementById("add-to-cart");
        addToCartButton.addEventListener("click", () => {
            this.cartManager.addItem(product);
            alert(`${product.title} added to cart!`);
        });
    }
}

const productPage = new ProductPage();
productPage.init();