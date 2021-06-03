import { Subject } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingerdientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Orange', 12)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingerdientAdded.next(this.ingredients.slice());
    }

    addIngredients(ingredents: Ingredient[]) {
        /*for( let temp of ingredents) {
            this.addIngredient(temp);
        }*/
        this.ingredients.push(...ingredents);
        this.ingerdientAdded.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngrdient: Ingredient) {
        this.ingredients[index] = newIngrdient;
        this.ingerdientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingerdientAdded.next(this.ingredients.slice());
    }
}