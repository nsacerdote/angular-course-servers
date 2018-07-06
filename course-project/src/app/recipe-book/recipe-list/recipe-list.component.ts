import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {FeatureState, State} from '../store/recipe.reducers';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipeBookState: Observable<State>;

    constructor(private store: Store<FeatureState>) { }

    ngOnInit() {
        this.recipeBookState = this.store.select('recipeBook');
    }

}
