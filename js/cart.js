export class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    checkout() {
        this.clearCart();
        alert("Order placed successfully! Thank you for shopping with us.");
    }

    saveForLater(productId) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            wishlist.push(item);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            this.removeItem(productId);
        }
    }
}