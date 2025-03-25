import { calculateThroughputOfCrushing, CrushingRecipe, crushingRecipeInputSchema } from "./crushing";
import { RecipeThroughput } from "./types";

export type Recipe = CrushingRecipe;

export const recipeInputSchema = crushingRecipeInputSchema;
export type RecipeInput = Zod.infer<typeof recipeInputSchema>;

export function calculateThroughput(recipe: Recipe, input: RecipeInput): RecipeThroughput | undefined {
  try {
    switch (recipe.type) {
      case "create:crushing":
      case "create:milling":
        return calculateThroughputOfCrushing(recipe, input);
    }
  } catch (e) {
    console.error(e);
    return undefined
  }
}
