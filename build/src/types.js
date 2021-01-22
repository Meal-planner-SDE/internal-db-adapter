"use strict";
/*********
 * Type definitions
 *   TypeScript interfaces and types should be defined here!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlan = exports.DailyPlan = exports.isError = void 0;
const isError = (arg) => {
    return arg && arg.error;
};
exports.isError = isError;
class DailyPlan {
    constructor(daily_plan) {
        this.daily_plan_id = daily_plan.daily_plan_id;
        this.meal_plan_id = daily_plan.meal_plan_id;
        this.recipes = daily_plan.recipes || [];
    }
}
exports.DailyPlan = DailyPlan;
class MealPlan {
    constructor(meal_plan) {
        this.meal_plan_id = meal_plan.meal_plan_id;
        this.mp_user_id = meal_plan.mp_user_id;
        this.is_current = meal_plan.is_current;
        this.daily_calories = meal_plan.daily_calories;
        this.diet_type = meal_plan.diet_type;
        this.daily_plans = meal_plan.daily_plans || [];
    }
}
exports.MealPlan = MealPlan;
