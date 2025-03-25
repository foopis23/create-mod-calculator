import { z } from "zod";

export const tagIngredientSchema = z.object({
	tag: z.string()
})
export type TagIngredient = z.infer<typeof tagIngredientSchema>

export const itemIngredientSchema = z.object({
	item: z.string()
})
export type ItemIngredient = z.infer<typeof itemIngredientSchema>

export const ingredientSchema = z.union([tagIngredientSchema, itemIngredientSchema])
export type Ingredient = z.infer<typeof ingredientSchema>

export function isTagIngredient(ingredient: Ingredient): ingredient is TagIngredient {
	return (ingredient as TagIngredient).tag !== undefined
}

export function isItemIngredient(ingredient: Ingredient): ingredient is ItemIngredient {
	return (ingredient as ItemIngredient).item !== undefined
}