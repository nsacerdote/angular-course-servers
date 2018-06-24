import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipe: Recipe;
    editMode: boolean;
    recipeForm: FormGroup;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private recipeService: RecipeService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.init(params['id']);
            }
        );
    }

    private init(idParam: string) {
        this.editMode = !!idParam;
        if (this.editMode) {
            this.recipe = this.recipeService.getRecipe(+idParam);
        } else {
            this.recipe = new Recipe('', '', '', []);
        }
        this.initForm();
    }

    private initForm() {
        this.recipeForm = new FormGroup({
            'name': new FormControl(this.recipe.name, Validators.required),
            'imagePath': new FormControl(this.recipe.imagePath, Validators.required),
            'description': new FormControl(this.recipe.description, Validators.required),
            'ingredients': this.transformIngredientsToFormArray(this.recipe.ingredients)
        });
    }

    private transformIngredientsToFormArray(ingredients: Ingredient[]): FormArray {
        return new FormArray(ingredients.map(this.convertIngredientToFormGroup));
    }

    private convertIngredientToFormGroup(ingredient: Ingredient): FormGroup {
        return new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        });
    }

    onSubmit() {
        const recipe: Recipe = this.obtainRecipeFromRecipeForm();
        if (this.editMode) {
            this.recipeService.updateRecipe(recipe);
            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        } else {
            this.recipeService.addRecipe(recipe);
            this.router.navigate(['../', recipe.id], {relativeTo: this.activatedRoute});
        }
    }

    obtainRecipeFromRecipeForm(): Recipe {
        this.recipe.name = this.recipeForm.value['name'];
        this.recipe.imagePath = this.recipeForm.value['imagePath'];
        this.recipe.description = this.recipeForm.value['description'];
        this.recipe.ingredients = this.recipeForm.value['ingredients'];
        return this.recipe;
    }

    getFormArrayIngredients(): FormArray {
        return <FormArray>this.recipeForm.get('ingredients');
    }

    onAddIngredient() {
        this.getFormArrayIngredients().push(
            this.convertIngredientToFormGroup(new Ingredient(null, null))
        );
    }

    onDeleteIngredient(index: number) {
        this.getFormArrayIngredients().removeAt(index);
    }
}
