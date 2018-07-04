import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';

export interface FeatureState {
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

export function recipeReducer(state, action) {
    return state;
}
