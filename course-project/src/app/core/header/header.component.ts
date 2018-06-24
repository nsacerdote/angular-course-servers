import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {RecipeService} from '../../recipe-book/recipe.service';
import {AuthService} from '../../auth/auth.service';
import * as fromAuth from '../../auth/store/auth.reducers';
import {AppState} from '../../store/app.reducers';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<AppState>,
                private recipeService: RecipeService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onFetchData() {
        this.recipeService.fetchRecipes();
    }

    onSaveData() {
        this.recipeService.saveRecipes();
    }
}
