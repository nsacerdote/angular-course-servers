import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import { AppState } from '../../store/app.reducers';

export interface FeatureState extends AppState{
    recipeBook: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Chicken wings',
        'description',
        'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg',
        [
            new Ingredient('Chicken', 1),
            new Ingredient('BBQ Sauce', 5)
        ]),
        new Recipe('Chicken',
        'description 2',
        'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg',
        [
            new Ingredient('Chicken', 2)
        ])
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes : [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes : [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE): {
            const recipes = [...state.recipes];
            recipes[
                recipes.findIndex((recipe) => (recipe.id === action.payload.id))
                ] = action.payload.recipe;
            return {
                ...state,
                recipes: recipes
            };
        }
        case (RecipeActions.DELETE_RECIPE): {
            const recipes = [...state.recipes];
            recipes.splice(
                recipes.findIndex((recipe) => (recipe.id === action.payload)),
                1
            );
            return {
                ...state,
                recipes : recipes
            };
        }
    }
    return state;
}
