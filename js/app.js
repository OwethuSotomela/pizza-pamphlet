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

                price = parseFloat(price).toFixed(2);

                let balance = price - getMyTotal;

                balance = parseFloat(balance).toFixed(2)

                if (price < getMyTotal) {
                    this.addRedColor()
                    this.feedback = this.error + ` you're ${'R' + balance} short`;
                } else {
                    this.addGreenColor()
                    this.feedback = this.success + ` your change is ${'R' + balance}`;
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
            addRedColor() {
                aboutFeedback.classList.add("red");
            },
            addGreenColor() {
                aboutFeedback.classList.add("green");
            },
            // addColor(price) {
            //     alert(price)
            //     let getMyTotal = this.getTotal()
            //     alert(getMyTotal)
            //     if (price < getMyTotal) {
            //         aboutFeedback.classList.add("red")
            //     } else {
            //         aboutFeedback.classList.add("green")
            //     }
            // }
        }
    })
})
