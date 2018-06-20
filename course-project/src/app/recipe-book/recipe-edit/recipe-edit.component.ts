import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipe: Recipe;
    editMode = false;

    constructor(private activatedRoute: ActivatedRoute,
                private recipeService: RecipeService) { }

  ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.init(params['id']);
            }
        );
  }

  init(idParam: string) {
      this.editMode = !!idParam;
      if (this.editMode) {
          this.recipe = this.recipeService.getRecipe(+idParam);
      } else {
          this.recipe = new Recipe('', '', '', []);
      }
  }

}
