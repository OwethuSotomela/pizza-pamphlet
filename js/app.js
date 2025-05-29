class PizzaApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.pizzas = [
      { size: 'small', name: 'Small Pizza', price: 48.99, qty: 0, image: 'https://i.imgur.com/dG6Hh8I.png' },
      { size: 'medium', name: 'Medium Pizza', price: 78.99, qty: 0, image: 'https://i.imgur.com/zpKxf1F.png' },
      { size: 'large', name: 'Large Pizza', price: 114.99, qty: 0, image: 'https://i.imgur.com/ptJYgUP.png' }
    ];
  }

  connectedCallback() {
    this.render();
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
          font-family: 'Segoe UI', sans-serif;
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: #d35400;
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
          width: 100%;
          max-width: 180px;
          height: auto;
          border-radius: 8px;
          margin: 0 auto 1rem;
          display: block;
        }
        button {
          margin-top: 0.5rem;
          padding: 0.5rem 1.2rem;
          background: #e67e22;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover {
          background: #d35400;
        }
        /* Fixed footer cart */
        .cart {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #f9f9f9;
          border-top: 2px solid #ccc;
          padding: 1rem 1.5rem;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
          z-index: 999;
          font-family: 'Segoe UI', sans-serif;
          max-height: 160px;
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
          font-size: 1.1rem;
        }
        /* Checkout button */
        .checkout-btn {
          margin-top: 0.8rem;
          width: 100%;
          padding: 0.75rem;
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .checkout-btn:hover {
          background: #219150;
        }
        /* Scrollbar for cart if too tall */
        .cart::-webkit-scrollbar {
          height: 6px;
        }
        .cart::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        @media (max-width: 600px) {
          .pizza img {
            max-width: 140px;
          }
          .cart {
            max-height: 200px;
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
          button {
            padding: 0.4rem 1rem;
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
          <button class="checkout-btn">Checkout</button>
        </div>
      ` : ''}
    `;

    this.shadowRoot.innerHTML = style + html;

    // Order button logic
    this.shadowRoot.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = +e.target.getAttribute('data-index');
        this.pizzas[index].qty++;
        this.render();
      });
    });

    // Checkout button logic
    const checkoutBtn = this.shadowRoot.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        alert(`Thank you for your order!\nTotal: R${total.toFixed(2)}`);
        // Clear cart after checkout
        this.pizzas.forEach(p => p.qty = 0);
        this.render();
      });
    }
  }
}

class HeroBanner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .banner {
          background: linear-gradient(to right, #ff5f6d, #ffc371);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          font-family: 'Segoe UI', sans-serif;
        }
        .banner-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .banner-content p {
          font-size: 1.2rem;
        }
        @media (max-width: 600px) {
          .banner-content h1 {
            font-size: 1.8rem;
          }
          .banner-content p {
            font-size: 1rem;
          }
        }
      </style>
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