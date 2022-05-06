import Alpine from `alpinejs`
import dropdown from './dropdown.js'

Alpine.data('dropdown', dropdown)
 
Alpine.start()

var cart = [];
var pizza = "";
 
function smallOrder(price){
    var smallPizza = cart.filter(pizza => (pizza.size === "small"));
    if (smallPizza.length == 0) {
        cart.push({
            size: "small",
            qty: 1,
            price: price
        });
    } else {
        smallPizza[0].qty++;
        smallPizza[0].price += price;
    }}

// document.addEventListener('alpine:init', ()=>{
//     Alpine.data('order', (pizza)=>({
//         toggle(){
//             // this.order = ! this.order
//         }
//     }))
// })


// document.addEventListener('alpine:init', () => {
//     Alpine.data('cart', () => ({
//         open: false,

//         toggle() {
//             this.open = ! this.open
//         }
//     }))
// })

// function order() {
//     if (!cartList.includes(pizza)) {
//         cartList.push(pizza);
//     }
// }

Alpine.data('open', () => ({
    open: false,
 
    trigger: {
        ['@click']() {
            this.open = ! this.open
        },
    },
 
    dialogue: {
        ['x-show']() {
            return this.open
        },
    },
}))




// <!-- <h3>$pizza</h3> -->
// <div x-data="{qty: '1', '2', '3'}">
//     <select x-model="qty">
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//     </select>

//     <div x-data="{size: 'small', 'medium', 'large'}">
//         <select x-model="size">
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//         </select>
//     </div>
//     <div x-data="{price: 'small', 'medium', 'large'}">
//         <select x-model="size">
//             <option value="R48.99">R48.99</option>
//             <option value="R78.99">R78.99</option>
//             <option value="R114.99">R114.99</option>
//         </select>
//         <button @click="addPizza($pizza)">Let me see</button>
//     </div>
// </div>