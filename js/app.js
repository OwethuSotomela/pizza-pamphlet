document.addEventListener('alpine:init', () => {
    Alpine.data('pizzas', () => {
        return {
            init() {
                console.log(this.orders[0].subTotal())
            },
            open: false,
            show() {
                return this.getTotal() > 0;
            },
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
            feedback: ''
            ,

            makePayment(price) {
                var getMyTotal = this.getTotal();
                if (price < getMyTotal) {
                    this.feedback = this.error
                } else {
                    this.feedback = this.success
                }

                setTimeout(() => {
                    this.feedback = '';
                }, 5000);
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
