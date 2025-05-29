function pizzaApp() {
  return {
    selectedSize: 'medium',
    selectedToppings: [],
    availableToppings: ['Cheese', 'Pepperoni', 'Mushrooms', 'Olives', 'Pineapple'],
    cart: [],
    payment: '',
    message: '',
    isDarkMode: false,

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },

    addToCart() {
      if (!this.selectedSize || this.selectedToppings.length === 0) {
        this.message = 'Please select size and at least one topping.';
        return;
      }

      this.cart.push({
        size: this.selectedSize,
        toppings: [...this.selectedToppings],
        price: this.calculatePrice(this.selectedSize, this.selectedToppings.length)
      });

      this.selectedToppings = [];
      this.message = 'Pizza added to cart!';
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    itemSummary(item) {
      return `${item.size.toUpperCase()} - ${item.toppings.join(', ')} (R${item.price.toFixed(2)})`;
    },

    calculatePrice(size, toppingCount) {
      const basePrices = { small: 40, medium: 60, large: 85 };
      const toppingPrice = 7;
      return basePrices[size] + toppingCount * toppingPrice;
    },

    cartTotal() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },

    checkout() {
      const total = this.cartTotal();
      if (this.payment < total) {
        this.message = `Insufficient payment. You need R${(total - this.payment).toFixed(2)} more.`;
        return;
      }

      const change = this.payment - total;
      this.message = `Payment successful! Your change: R${change.toFixed(2)}`;
      this.cart = [];
      this.payment = '';
    }
  };
}