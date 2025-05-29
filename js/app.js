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

        @media (max-width: 480px) {
          .pizza img {
            height: 120px;
            object-fit: cover;
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
  }
}

customElements.define('pizza-app', PizzaApp);