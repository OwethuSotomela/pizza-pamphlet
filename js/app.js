document.addEventListener('alpine:init', ()=>{
    Alpine.data('small', ()=>{
        return {
            init() {
                console.log(this.orders[0].subTotal())
            },
            open: false,
            orders: [
                {
                    size: 'Small',
                    name: 'Small Pizaa',
                    price: 48.99,
                    qty: 1,
                    description: 'Small pizza with 3 toppings. 1 topping. 3 or less other toppings.',
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

document.addEventListener('alpine:init', ()=>{
    Alpine.data('medium', ()=>{
        return {
            init() {
                console.log(this.orders[0].subTotal())
            },
            open: false,
            orders: [
                {
                    size: 'Medium',
                    name: 'Medium Pizza',
                    price: 78.99,
                    qty: 1,
                    description: 'Medium margerita pizza with 3 toppings max. 2 oe less meat topping. 3 or less other toppings',
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

document.addEventListener('alpine:init', ()=>{
    Alpine.data('large', ()=>{
        return {
            init() {
                console.log(this.orders[0].subTotal())
            },
            open: false,
            orders: [
                {
                    size: 'Large',
                    name: 'Large Pizza',
                    price: 114.99,
                    qty: 1,
                    description: 'Large margerita pizza with 3 toppings max. 3 meat toppingds max. 3 or less other toppings.',
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
