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

export interface Region {
  id: number;
  name: string;
  lat: number;
  long: number;
}

export interface CasesPerRegion {
  region: Region;
  cases: number;
}

export interface Entry {
  hospitalized_with_symptoms: number;
  intensive_care: number;
  total_hospitalized: number;
  home_isolation: number;
  total_positive: number;
  total_positive_variation: number;
  new_positives: number;
  resigned_cured: number;
  deceased: number;
  cases_from_suspected_diagnostic: number;
  cases_from_screening: number;
  total_cases: number;
  tampons: number;
  cases_tested: number;
}

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
  current_weekly_plan_id: number
}

export interface ShoppingList {
  shopping_list_id: number;
}
