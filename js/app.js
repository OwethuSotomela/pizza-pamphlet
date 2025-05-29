class PizzaApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.pizzas = [
      { size: 'small', name: 'Small Pizza', price: 48.99, qty: 0, image: 'https://i.imgur.com/dG6Hh8I.png' },
      { size: 'medium', name: 'Medium Pizza', price: 78.99, qty: 0, image: 'https://i.imgur.com/zpKxf1F.png' },
      { size: 'large', name: 'Large Pizza', price: 114.99, qty: 0, image: 'https://i.imgur.com/ptJYgUP.png' }
    ];
    this.payment = '';
    this.checkoutMessage = '';
  }

  connectedCallback() {
    this.render();
  }

  handleOrder(index) {
    this.pizzas[index].qty++;
    this.render();
  }

  handlePaymentInput(e) {
    this.payment = e.target.value;
    // Don't render here to avoid input jumping
  }

  handlePay() {
    const total = this.pizzas.reduce((sum, p) => sum + p.qty * p.price, 0);
    const paymentValue = parseFloat(this.payment);

    if (isNaN(paymentValue)) {
      this.checkoutMessage = "Please enter a valid amount.";
    } else if (paymentValue < total) {
      const short = (total - paymentValue).toFixed(2);
      this.checkoutMessage = `R${short} short.`;
    } else {
      const change = (paymentValue - total).toFixed(2);
      this.checkoutMessage = `Thank you! Your change is R${change}.`;
    }

    this.render();
  }

  render() {
    const total = this.pizzas.reduce((sum, p) => sum + p.qty * p.price, 0);
    const hasCart = this.pizzas.some(p => p.qty > 0);

    const style = `
      <style>
        * { box-sizing: border-box; }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
          font-family: 'Segoe UI', sans-serif;
        }
        h1 { text-align: center; margin: 2rem 0 1rem; }
        .pizzas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .pizza {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
        }
        .pizza img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        button {
          margin-top: 0.5rem;
          padding: 0.5rem 1.2rem;
          background: #ff6600;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }
        button:hover {
          background: #e65400;
        }
        .cart {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #f9f9f9;
          border-top: 2px solid #ccc;
          padding: 1rem;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
          z-index: 999;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          margin: 0.3rem 0;
          font-size: 0.95rem;
        }
        .total {
          font-weight: bold;
          text-align: right;
          margin-top: 0.5rem;
        }
        .checkout {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        input[type="number"] {
          padding: 0.4rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .checkout button {
          background: #27ae60;
          color: white;
          border: none;
          padding: 0.5rem;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .checkout button:hover {
          background: #219150;
        }
        .message {
          font-weight: bold;
          color: #333;
        }

        @media (max-width: 480px) {
          .pizza img {
            height: 120px;
            object-fit: cover;
          }
          .cart {
            font-size: 0.9rem;
          }
          .checkout input,
          .checkout button {
            font-size: 0.9rem;
          }
        }
      </style>
    `;

    const html = `
      <div class="container">
        <h1>Perfect Pizza</h1>
        <div class="pizzas">
          ${this.pizzas.map((p, i) => `
            <div class="pizza">
              <img src="${p.image}" alt="${p.name}">
              <h2>${p.name}</h2>
              <p><strong>R${p.price.toFixed(2)}</strong></p>
              <p>Qty: ${p.qty}</p>
              <button data-index="${i}">Order</button>
            </div>
          `).join('')}
        </div>
      </div>

      ${hasCart ? `
        <div class="cart">
          ${this.pizzas.filter(p => p.qty > 0).map(p => `
            <div class="cart-item">
              <span>${p.name} x ${p.qty}</span>
              <span>R${(p.qty * p.price).toFixed(2)}</span>
            </div>
          `).join('')}
          <div class="total">Total: R${total.toFixed(2)}</div>
          <div class="checkout">
            <input type="number" placeholder="Enter amount paid" value="${this.payment}">
            <button id="pay-btn">Pay</button>
            <div class="message">${this.checkoutMessage}</div>
          </div>
        </div>
      ` : ''}
    `;

    this.shadowRoot.innerHTML = style + html;

    // Event Listeners
    this.shadowRoot.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = +e.target.getAttribute('data-index');
        this.handleOrder(index);
      });
    });

    const input = this.shadowRoot.querySelector('input[type="number"]');
    if (input) {
      input.addEventListener('input', e => this.handlePaymentInput(e));
    }

    const payBtn = this.shadowRoot.querySelector('#pay-btn');
    if (payBtn) {
      payBtn.addEventListener('click', () => this.handlePay());
    }
  }
}

class HeroBanner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="banner">
        <div class="banner-content">
          <h1>Perfect Pizza</h1>
          <p>Order. Pay. Enjoy Pizza — Fast & Easy.</p>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-banner', HeroBanner);
customElements.define('pizza-app', PizzaApp);