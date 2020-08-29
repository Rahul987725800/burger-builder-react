import React from "react";
import Aux from "../../hoc/_Aux/_Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.7,
};
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    };
    updatePurchaseState = () => {
        const ingredients = { ...this.state.ingredients };
        let sum = 0;
        for (let ig in ingredients) {
            sum += ingredients[ig];
        }
        this.setState({ purchasable: sum > 0 });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: newPrice,
            },
            this.updatePurchaseState
        );
    };
    removeIngredientHandler = (type) => {
        this.setState((prevState) => {
            let ingredients = { ...prevState.ingredients };
            if (ingredients[type] <= 0) return;
            ingredients[type]--;
            let totalPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return { ingredients, totalPrice };
        }, this.updatePurchaseState);
    };
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Rahul Gupta",
                address: {
                    street: "703 sector 22 A",
                    city: "Gurgaon",
                    country: "Germany",
                },
                email: "guptarahul@gmail.com",
            },
            deliveryMethod: "fastest",
        };
        axios
            .post("/orders.json", order)
            .then((response) => {
                this.setState({loading: false, purchasing: false})
            })
            .catch((err) => {
                this.setState({loading: false, purchasing: false})
            });
    };
    render() {
        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;
