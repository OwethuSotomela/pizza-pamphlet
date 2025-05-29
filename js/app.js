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
    this.message = '';
  }

  connectedCallback() {
    this.render();
  }

  handlePaymentInput(e) {
    this.payment = e.target.value;
    this.calculateMessage();
    this.render();
  }

  calculateMessage() {
    const total = this.pizzas.reduce((sum, p) => sum + p.qty * p.price, 0);
    const paymentNum = parseFloat(this.payment);

    if (isNaN(paymentNum) || paymentNum === 0) {
      this.message = '';
    } else if (paymentNum < total) {
      this.message = `Your money is short by R${(total - paymentNum).toFixed(2)}`;
    } else {
      this.message = `Here's your change: R${(paymentNum - total).toFixed(2)}`;
    }
  }

  render() {
    const total = this.pizzas.reduce((sum, p) => sum + p.qty * p.price, 0);
    const hasCart = this.pizzas.some(p => p.qty > 0);

    const style = `
      <style>
        * {
          box-sizing: border-box;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
          padding-bottom: 200px; /* Space for fixed cart so buttons aren't hidden */
          font-family: 'Segoe UI', sans-serif;
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
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
          transition: transform 0.2s;
        }
        .pizza:hover {
          transform: scale(1.02);
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
          max-height: 220px;
          overflow-y: auto;
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
        .payment-section {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
        }
        input.payment-input {
          padding: 0.5rem;
          font-size: 1rem;
          width: 150px;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: right;
        }
        .payment-message {
          font-weight: bold;
          font-size: 0.95rem;
          min-width: 220px;
          color: #333;
        }
        .payment-message.negative {
          color: #c0392b;
        }
        .payment-message.positive {
          color: #27ae60;
        }
        @media (max-width: 480px) {
          .pizza img {
            height: 120px;
            object-fit: cover;
          }
          .payment-section {
            justify-content: center;
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
          <div class="payment-section">
            <input
              type="number"
              min="0"
              step="0.01"
              class="payment-input"
              placeholder="Enter amount paid"
              value="${this.payment}"
            />
            <div class="payment-message ${this.message.includes('short') ? 'negative' : 'positive'}">
              ${this.message}
            </div>
          </div>
        </div>
      ` : ''}
    `;

    this.shadowRoot.innerHTML = style + html;

    // Button logic
    this.shadowRoot.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = +e.target.getAttribute('data-index');
        this.pizzas[index].qty++;
        this.render();
      });
    });

    // Payment input logic
    const paymentInput = this.shadowRoot.querySelector('.payment-input');
    if (paymentInput) {
      paymentInput.addEventListener('input', e => this.handlePaymentInput(e));
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