document.addEventListener('alpine:init', ()=>{
    Alpine.data('data', ()=>{
        return {
            init() {
                console.log('Run when the page load');
                console.log(this.orders[0].subTotal())
            },
            open: false,
            orders: [
                {
                    size: 'small',
                    name: 'Small Pizaa',
                    price: 48.99,
                    qty: 2,
                    description: 'Wowow',
                    subTotal() {
                        return Number(this.price) * Number(this.qty)
                    },
                    add() {
                        this.qty++
                    }
                }, 
            ],
            getOrder(){

            }
        }
    })
})

