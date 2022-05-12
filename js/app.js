document.addEventListener('alpine:init', () => {
    Alpine.data('pizzas', () => {
        return {
            init() {
                console.log(this.orders[0].subTotal())
            },
            open: false,
            orderPizza(pizza) {
                pizza.add()
            },
            getTotal() {
                return _.sumBy(this.orders, o => o.subTotal())
            },
            success: 'Successful Purchase'
            ,
            error: 'Insufficient funds'
            ,
            makePayment(price) {

                console.log(price)
                var getMyTotal = this.getTotal();
                if (price < getMyTotal) {
                    // alert( "Insufficient funds")
                    this.error
                } else {
                    // alert("Payment successfull")
                    this.success
                }
            },
            orders: [
                {
                    size: 'small',
                    name: 'Small Pizza',
                    price: 48.99,
                    qty: 0,
                    description: 'Small pizza with 3 toppings. 1 topping. 3 or less other toppings.',
                    subTotal() {
                        return Number(this.price) * Number(this.qty)
                    },
                    add() {
                        this.qty++
                    },
                    minus() {
                        this.qty--
                    },
                },
                {
                    size: 'medium',
                    name: 'Medium Pizza',
                    price: 78.99,
                    qty: 0,
                    description: 'Medium margerita pizza with 3 toppings max. 2 oe less meat topping. 3 or less other toppings',
                    subTotal() {
                        return Number(this.price) * Number(this.qty)
                    },
                    add() {
                        this.qty++
                    },
                    minus() {
                        this.qty--
                    }
                },
                {
                    size: 'large',
                    name: 'Large Pizza',
                    price: 114.99,
                    qty: 0,
                    description: 'Large margerita pizza with 3 toppings max. 3 meat toppingds max. 3 or less other toppings.',
                    subTotal() {
                        return Number(this.price) * Number(this.qty)
                    },
                    add() {
                        this.qty++
                    },
                    minus() {
                        this.qty--
                    }
                },
            ],
            getOrder() {

            }
        }
    })
})
