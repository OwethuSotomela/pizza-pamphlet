class PizzaApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      orders: [
        {
          size: 'small',
          name: 'Small Pizza',
          price: 48.99,
          qty: 0,
          description: 'Small pizza with 3 toppings.',
        },
        {
          size: 'medium',
          name: 'Medium Pizza',
          price: 78.99,
          qty: 0,
          description: 'Medium pizza with 3 toppings.',
        },
        {
          size: 'large',
          name: 'Large Pizza',
          price: 114.99,
          qty: 0,
          description: 'Large pizza with 3 toppings.',
        }
      ],
      feedback: '',
    };
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.shadowRoot.querySelectorAll('.orderBtn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.state.orders[i].qty++;
        this.render();
      });
    });

    this.shadowRoot.querySelectorAll('.addQty').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.state.orders[i].qty++;
        this.render();
      });
    });

    this.shadowRoot.querySelectorAll('.subQty').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (this.state.orders[i].qty > 0) {
          this.state.orders[i].qty--;
          this.render();
        }
      });
    });

    const payBtn = this.shadowRoot.querySelector('.checkoutBtn');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        const input = parseFloat(this.shadowRoot.querySelector('.inputPrice').value);
        const total = this.getTotal();
        const feedbackEl = this.shadowRoot.querySelector('.aboutFeedback');
        let message = '';
        if (input >= total) {
          message = `✅ Payment successful. Change: R${(input - total).toFixed(2)}`;
          feedbackEl.className = 'aboutFeedback green';
        } else {
          message = `❌ Insufficient funds. Short: R${(total - input).toFixed(2)}`;
          feedbackEl.className = 'aboutFeedback red';
        }
        this.state.feedback = message;
        this.render();
      });
    }
  }

  getTotal() {
    return this.state.orders.reduce((sum, o) => sum + o.qty * o.price, 0);
  }

  render() {
    const cartRows = this.state.orders
      .filter(order => order.qty > 0)
      .map(order => `
        <tr>
          <td>${order.size}</td>
          <td>R${(order.qty * order.price).toFixed(2)}</td>
          <td>${order.qty}</td>
          <td>
            <button class="addQty">+</button>
            <button class="subQty">-</button>
          </td>
        </tr>
      `).join('');

    const pizzaCards = this.state.orders.map(order => `
      <div class="pizza ${order.size}">
        <img src="images/pi2.jpeg" alt="${order.name}" />
        <h2>${order.name}</h2>
        <h3>R${order.price}</h3>
        <i>${order.description}</i>
        <h4>Qty: ${order.qty}</h4>
        <button class="orderBtn">Order</button>
      </div>
    `).join('');

    const total = this.getTotal().toFixed(2);

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../css/style.css" />
      <div class="container">
        <h1>Perfect Pizza</h1>

        <div class="specials">${pizzaCards}</div>

        ${total > 0 ? `
        <div class="cart">
          <table class="myCart">
            <caption>Shopping Cart</caption>
            <tr><th>Size</th><th>Price</th><th>Qty</th><th>Control</th></tr>
            ${cartRows}
            <tr class="trTotal">
              <td><strong>Total</strong></td>
              <td colspan="3">R${total}</td>
            </tr>
          </table>

          <div class="makePayment">
            <span class="inputPriceSpan">Enter an amount to pay: R</span>
            <input type="number" class="inputPrice" />
            <div class="aboutFeedback">${this.state.feedback}</div>
            <button class="checkoutBtn">Checkout</button>
          </div>
        </div>` : ''}
      </div>
    `;
    this.bindEvents();
  }
}

customElements.define('pizza-app', PizzaApp);