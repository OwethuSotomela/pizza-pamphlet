class PizzaApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.pizzas = [
      { size: 'small', name: 'Small Pizza', price: 48.99, qty: 0 },
      { size: 'medium', name: 'Medium Pizza', price: 78.99, qty: 0 },
      { size: 'large', name: 'Large Pizza', price: 114.99, qty: 0 }
    ];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const total = this.pizzas.reduce((sum, p) => sum + p.qty * p.price, 0);
    const style = `
      <style>
        * { box-sizing: border-box; }
        .container {
          max-width: 900px;
          margin: auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        h1 { text-align: center; }
        .pizzas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-around;
        }
        .pizza {
          flex: 1 1 250px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }
        .pizza h3 { margin: 0.5rem 0; }
        button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background: #04AA6D;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #02865b;
        }
        .cart {
          margin-top: 2rem;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        .total {
          font-weight: bold;
          text-align: right;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .pizzas {
            flex-direction: column;
            align-items: center;
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
              <h2>${p.name}</h2>
              <h3>R${p.price.toFixed(2)}</h3>
              <p>Qty: ${p.qty}</p>
              <button data-index="${i}">Order</button>
            </div>
          `).join('')}
        </div>
        <div class="cart">
          ${this.pizzas.filter(p => p.qty > 0).map(p => `
            <div class="cart-item">
              <span>${p.name} x ${p.qty}</span>
              <span>R${(p.qty * p.price).toFixed(2)}</span>
            </div>
          `).join('')}
          ${total > 0 ? `<div class="total">Total: R${total.toFixed(2)}</div>` : ''}
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = style + html;
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