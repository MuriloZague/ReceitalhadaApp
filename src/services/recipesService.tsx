import { database } from "../services/connectionFirebase";
import { ref, push, get, update, remove } from "firebase/database";
import { Recipe } from "../models/Recipe";

const PATH = "recipes";

export const recipeService = {
  async create(recipe: Recipe) {
    const recipeRef = ref(database, PATH);
    await push(recipeRef, recipe);
  },

  async getAll(): Promise<Recipe[]> {
    const snapshot = await get(ref(database, PATH));
    const data = snapshot.val();

    const recipes: Recipe[] = [];

    for (let id in data) {
      recipes.push({ id, ...data[id] });
    }

    return recipes;
  },

  async update(id: string, product: Recipe) {
    const productRef = ref(database, `${PATH}/${id}`);
    await update(productRef, product);
  },

  async delete(id: string) {
    const productRef = ref(database, `${PATH}/${id}`);
    await remove(productRef);
  },
  
};