import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editingIngredient: Ingredient;
    editingIngredientIndex: number;
}

const initialState = {
    ingredients: [
        new Ingredient('Tomato', 2),
        new Ingredient('Carrot', 3)
    ],
    editingIngredient: null,
    editingIngredientIndex: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients[state.editingIngredientIndex] = action.payload.updatedIngredient;
            return {
                ...state,
                ingredients: ingredients,
                editingIngredient: null,
                editingIngredientIndex: null
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(state.editingIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredients,
                editingIngredient: null,
                editingIngredientIndex: null
            };
        }
        case ShoppingListActions.START_EDIT_INGREDIENT: {
            const editIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editingIngredient : editIngredient,
                editingIngredientIndex : action.payload
            };
        }
        case ShoppingListActions.STOP_EDIT_INGREDIENT: {
            return {
                ...state,
                editingIngredient : null,
                editingIngredientIndex : null
            };
        }
        default:
            return state;
    }
}
