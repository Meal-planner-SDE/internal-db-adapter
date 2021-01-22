/*********
 * Type definitions
 *   TypeScript interfaces and types should be defined here!
 */

export interface Error {
  error: any;
}

export const isError = (arg: any): arg is Error => {
  return arg && arg.error;
};

// export interface Region {
//   id: number;
//   name: string;
//   lat: number;
//   long: number;
// }

// export interface CasesPerRegion {
//   region: Region;
//   cases: number;
// }

// export interface Entry {
//   hospitalized_with_symptoms: number;
//   intensive_care: number;
//   total_hospitalized: number;
//   home_isolation: number;
//   total_positive: number;
//   total_positive_variation: number;
//   new_positives: number;
//   resigned_cured: number;
//   deceased: number;
//   cases_from_suspected_diagnostic: number;
//   cases_from_screening: number;
//   total_cases: number;
//   tampons: number;
//   cases_tested: number;
// }

export interface MPUser {
  mp_user_id: number,
  username: string,
  height: number,
  weight: number,
  sex: string,
  birth_year: number,
  diet_type: string,
  activity_factor: string,
  address: string,
  shopping_list_id: number,
  current_meal_plan_id: number
}

export interface ShoppingList {
  shopping_list_id: number
}
export interface ShoppingListEntry {
  shopping_list_entry_id: number,
  shopping_list_id: number,
  ingredient_id: number,
  quantity: number,
  measure: string
}

export interface Recipe {
  recipe_id: number,
}
export interface DailyPlanRecipe{
  recipe_id: number,
  daily_plan_id: number
}

export interface DailyPlanRaw {
  daily_plan_id: number,
  meal_plan_id: number,
  recipes: Recipe[]
}

export class DailyPlan {
  daily_plan_id: number;
  meal_plan_id: number;
  recipes: Recipe[];
  constructor(daily_plan: DailyPlanRaw){
    this.daily_plan_id = daily_plan.daily_plan_id;
    this.meal_plan_id = daily_plan.meal_plan_id;
    this.recipes = daily_plan.recipes || [];
  }
}

export interface MealPlanRaw {
  meal_plan_id: number,
  mp_user_id: number,
  is_current: boolean,
  daily_calories: number,
  diet_type: string,
  daily_plans: DailyPlan[]
}

export class MealPlan {
  meal_plan_id: number;
  mp_user_id: number;
  is_current: boolean;
  daily_calories: number;
  diet_type: string;
  daily_plans: DailyPlan[]
  constructor(meal_plan: MealPlanRaw){
    this.meal_plan_id = meal_plan.meal_plan_id;
    this.mp_user_id = meal_plan.mp_user_id;
    this.is_current = meal_plan.is_current;
    this.daily_calories = meal_plan.daily_calories;
    this.diet_type = meal_plan.diet_type;
    this.daily_plans = meal_plan.daily_plans || [];
  }
}
