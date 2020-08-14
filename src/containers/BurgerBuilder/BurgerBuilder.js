import React from "react";
import Aux from "../../hoc/_Aux/_Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.7
}
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    };
    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    };
    removeIngredientHandler = type => {
        this.setState(prevState => {
            let ingredients = {...prevState.ingredients};
            if (ingredients[type] <= 0) return;
            ingredients[type]--;
            let totalPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return {ingredients, totalPrice}
        })
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                   ingredientAdded = {this.addIngredientHandler} 
                   ingredientRemoved = {this.removeIngredientHandler}
                   ingredients = {this.state.ingredients}
                   totalPrice = {this.state.totalPrice}
                   />
            </Aux>
        );
    }
}
export default BurgerBuilder;
