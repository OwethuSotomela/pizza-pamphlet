var pizza = "";
cart = [];

document.addEventListener('alpine:init', ()=>{
    Alpine.data('order', (pizza)=>({
        toggle(){
            // this.order = ! this.order
        }
    }))
})


document.addEventListener('alpine:init', () => {
    Alpine.data('cart', () => ({
        open: false,

        toggle() {
            this.open = ! this.open
        }
    }))
})

function order() {
    if (!cartList.includes(pizza)) {
        cartList.push(pizza);
    }
}