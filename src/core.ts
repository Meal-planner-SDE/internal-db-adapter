/*********
 * Core functionalities
 *   All the processing logics are defined here. In this way, we leave in the
 *   controller all the input/output filtering and selection, and here we write
 *   the "raw" logics. In this way they're also re-usable! :)
 *   Obviously, in a real project, those functionalities should be divided as well.
 *   "Core" is not a fixed word for this type of file, sometimes
 *   people put those functions in a Utils file, sometimes in a Helper
 *   file, sometimes in a Services folder with different files for every service..
 *   It really depends on your project, style and personal preference :)
 */

import { 
  // CasesPerRegion, Entry, 
  Error, 
  isError,
  // Region, 
  MPUser, 
  ShoppingList,
  ShoppingListEntry,
  Recipe, 
  MealPlan,
  MealPlanRaw,
  DailyPlan,
  DailyPlanRaw,
  DailyPlanRecipe,
} from './types';
import { queryDB, insertQuery, updateQuery } from './dbUtils';
// import config from '../config';
import qs from 'qs';

import axios from 'axios';
import { stringify } from 'querystring';
// import secrets from '../secrets';
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { indices: false });
};


const checkUserExists = async  (id: number) => {
  let user = await getUserById(id); // if user does not exists throws an error
  if (isError(user))
    throw user.error;
}


export const getUsers: () => Promise<MPUser[] | Error> = async () => {
  try {
    return await queryDB('SELECT * FROM MP_USER;', []).then((users) => {
      return users as MPUser[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const getUserByUsername: (user_name : string) => Promise<MPUser | Error> = async (user_name) => {
  try {
    return await queryDB(`SELECT * FROM MP_USER WHERE username = $1;`, [user_name]).then((users) => {
      if (users.length == 0)
        throw new Error("User not found");
      return users[0] as MPUser;
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const getUserById: (mp_user_id : number) => Promise<MPUser | Error> = async (mp_user_id) => {
  try {
    return await queryDB(`SELECT * FROM MP_USER WHERE mp_user_id = $1;`, [mp_user_id]).then((users) => {
      if (users.length == 0) 
        throw new Error("User not found");
      return users[0] as MPUser;
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const insertUser: (user : MPUser) => Promise<MPUser | Error> = async (user) => {
  try {
    let new_shopping_list = await insertShoppingList();
    user.shopping_list_id = new_shopping_list.shopping_list_id;


    let [query, params] = insertQuery("MP_USER", user);
    console.log(query);
    return await queryDB(query, params)
    .then((users) => {
      return users[0] as MPUser;
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const updateUser: (id: number, user : MPUser) => Promise<MPUser | Error> = async (id, user) => {
  try { 
    let [query, params] = updateQuery("MP_USER", user, id, ["shopping_list_id"]);
    console.log(query, params);


    return await queryDB(query, params)
    .then((users) => {
      if (users.length == 0)
        throw new Error("User not found");
      return users[0] as MPUser;
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

const insertShoppingList: () => Promise<ShoppingList> = async () => {
  let query = `
    INSERT INTO SHOPPING_LIST 
      DEFAULT VALUES
    RETURNING *;`
  return await queryDB(query, [])
    .then((shopping_lists) => {
      return shopping_lists[0] as ShoppingList;
    });
}

export const getUserRecipes: (mp_user_id:number) => Promise<Recipe[] | Error> = async (mp_user_id) => {
  try {
    await checkUserExists(mp_user_id)
    return await queryDB('SELECT recipe_id FROM SAVED_RECIPE WHERE mp_user_id = $1;', [mp_user_id]).then((recipes) => {
      return recipes as Recipe[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const insertUserRecipes: (mp_user_id: number, recipes : Recipe[]) => Promise<Recipe[] | Error> = async (
  mp_user_id, recipes
) => {
  try {
    let params = [] as any[];
    let query = `
      INSERT INTO SAVED_RECIPE (mp_user_id, recipe_id ) VALUES
      ${recipes.map(
        (recipe, i) => {
          params.push(mp_user_id);
          params.push(recipe.recipe_id);
          return `($${2*i + 1}, $${2*i + 2})`
        }
      ).join(',\n')}  RETURNING recipe_id`;
    return await queryDB(query, params)
    .then((recipes) => {
      return recipes as Recipe[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const removeUserRecipe: (mp_user_id: number, recipe_id : number) => Promise<Recipe[] | Error> = async (
  mp_user_id, recipe_id
) => {
  try {
    await checkUserExists(mp_user_id); // if user does not exists throws an error
    
    let params = [mp_user_id, recipe_id];
    let query = `
      DELETE FROM SAVED_RECIPE WHERE
      mp_user_id = $1 AND recipe_id = $2
      RETURNING recipe_id`;
    return await queryDB(query, params)
    .then((recipes) => {
      if (recipes.length == 0)
        throw new Error(`The user with id ${mp_user_id} has not saved recipe with id ${recipe_id}`);
      return recipes as Recipe[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const getUserShoppingListEntries: (id:number) => Promise<ShoppingListEntry[] | Error> = async (id) => {
  try {
    await checkUserExists(id);
    return await queryDB(`SELECT * FROM SHOPPING_LIST_ENTRY WHERE shopping_list_id = 
      (SELECT MP_USER.shopping_list_id FROM MP_USER WHERE mp_user_id = $1);`, [id]).then((entries) => {
      return entries as ShoppingListEntry[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};


export const updateUserShoppingListEntries: (mp_user_id: number,
  shopping_list_entries : ShoppingListEntry[]) => Promise<ShoppingListEntry[] | Error> = async (
  mp_user_id, shopping_list_entries
) => {
  try {
    // let entry = await getUserShoppingListEntry(mp_user_id, shopping_list_entry.ingredient_id);

    // if (entry === undefined){
    //   // insert new tuple
    // } else {
    //   // check measures 
    // }
    let user = await getUserById(mp_user_id);
    if (isError(user)){
      return user;
    }
    
    let fields = ["shopping_list_id", "ingredient_id", "quantity", "measure"]
    let uslid = user.shopping_list_id;
    let params =  shopping_list_entries.map(shopping_list_entry =>
        [uslid, shopping_list_entry.ingredient_id, 
         shopping_list_entry.quantity, shopping_list_entry.measure]
    );
    let query = `
    INSERT INTO SHOPPING_LIST_ENTRY (${fields.join(`, `)}) 
    VALUES ${params.map((entry, i) => `(
      ${entry.map((value, j) => `$${i*entry.length + (j+1)}`).join(`, `)}
      )`).join(`, `)}
    ON CONFLICT (ingredient_id) DO UPDATE
      SET quantity = SHOPPING_LIST_ENTRY.quantity + EXCLUDED.quantity
      WHERE SHOPPING_LIST_ENTRY.measure = EXCLUDED.measure
    RETURNING *;`;
    console.log(query, params)
    // let user_id_param = [user.shopping_list_id] as (string | number)[];
    return await queryDB(query, Array.prototype.concat.apply([], params))
    .then((entries) => {
      // if (entries.length != )
      //   throw new Error("The measure conflicts with the one already in the list")
      return entries as ShoppingListEntry[];
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const getUserMealPlans: (id: number) => Promise<MealPlan[] | Error> = async (id) => {
  try {
    await checkUserExists(id);
    interface MPjoinDPjoinDPR extends MealPlan, DailyPlan, DailyPlanRecipe {};
    let results = await queryDB(`SELECT * 
      FROM MEAL_PLAN NATURAL JOIN DAILY_PLAN NATURAL JOIN DAILY_PLAN_RECIPE
      WHERE mp_user_id = $1
      ORDER BY meal_plan_id, daily_plan_number, recipe_number;
      `, [id]).then(results => results as MPjoinDPjoinDPR[]);
    let meal_plans = {} as {[meal_plan_id: number]: MealPlan};
    let daily_plans = {} as {[daily_plan_id: number]: DailyPlan};
    for (let result of results){
      if (! (result.meal_plan_id in meal_plans)){
        meal_plans[result.meal_plan_id] = new MealPlan(result);
      }

      if (! (result.daily_plan_id in daily_plans)){
        daily_plans[result.daily_plan_id] = new DailyPlan(result);
        meal_plans[result.meal_plan_id].daily_plans.push(daily_plans[result.daily_plan_id]); 
      }

      daily_plans[result.daily_plan_id].recipes.push({"recipe_id" : result.recipe_id} as Recipe); 

    }
    return Object.values(meal_plans);
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
}

export const getUserMealPlanById: (id: number, mid: number) => Promise<MealPlan | Error> = async (id, mid) => {
  try {
    await checkUserExists(id);
    interface MPjoinDPjoinDPR extends MealPlan, DailyPlan, DailyPlanRecipe {};
    let results = await queryDB(`SELECT * 
      FROM MEAL_PLAN NATURAL JOIN DAILY_PLAN NATURAL JOIN DAILY_PLAN_RECIPE
      WHERE mp_user_id = $1 AND meal_plan_id = $2
      ORDER BY daily_plan_number, recipe_number;
      `, [id, mid]).then(results => {
        if (results.length == 0)
          throw new Error(`The user with id ${id} has no meal plan with id ${mid}`);
        return results as MPjoinDPjoinDPR[];
      });
    let meal_plan = new MealPlan(results[0]);
    let daily_plans = {} as {[daily_plan_id: number]: DailyPlan};
    for (let result of results){
      if (! (result.daily_plan_id in daily_plans)){
        daily_plans[result.daily_plan_id] = new DailyPlan(result);
        meal_plan.daily_plans.push(daily_plans[result.daily_plan_id]); 
      }
      daily_plans[result.daily_plan_id].recipes.push({"recipe_id" : result.recipe_id} as Recipe); 

    }
    return meal_plan;
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
}

const insertDailyPlan: (dp: DailyPlan, n:number) => Promise <DailyPlan> = async (dp, n) => {
  let params = [dp.meal_plan_id];
  let query = `INSERT INTO DAILY_PLAN (meal_plan_id, daily_plan_number) VALUES ($1, ${n}) RETURNING *;`

  let daily_plan = await queryDB(query, params)
  .then((daily_plans) => {
    console.log("Daily_plans got!");
    console.log(daily_plans)
    return daily_plans[0] as DailyPlan;
  });
  console.log(daily_plan);
  let rp = [] as Promise<Recipe>[];
  dp.recipes.map((recipe, i) => {
    params = [recipe.recipe_id, daily_plan.daily_plan_id]
    query = `INSERT INTO DAILY_PLAN_RECIPE (recipe_id, daily_plan_id, recipe_number) 
      VALUES ($1, $2, ${i}) RETURNING recipe_id;`;
    rp.push(queryDB(query, params).then(recipes => recipes[0] as Recipe));
  });

  daily_plan.recipes = await Promise.all(rp);

  return daily_plan;
  
}

export const insertUserMealPlan: (id: number, mp: MealPlan) => Promise<MealPlan | Error> = async (id, mp) => {
  try {
    // check daily plans
    if (mp.daily_plans.length == 0){
      throw new Error(`No daily plans given`);
    }
    mp.daily_plans.forEach((dp) => {
      if (dp.recipes.length == 0){
        throw new Error(`No recipes given for daily meal plan ${String(dp)}`);
      } else {
        dp.recipes.forEach(r => {
          if (r.recipe_id == null) {
            throw new Error (`Recipe ${String(r)} must have a recipe_id`);
          }
        })
      }
    })
    
    // insert meal plan
    let paramsMP = [id, mp.daily_calories, mp.diet_type] as any[];
    let queryMP = `
      INSERT INTO MEAL_PLAN (mp_user_id, daily_calories, diet_type ) VALUES
        (${paramsMP.map((param, i) => `$${i+1}`).join(`, `)})
        RETURNING *`;
    let meal_plan = await queryDB(queryMP, paramsMP)
    .then((meal_plans) => {
      return meal_plans[0] as MealPlan;
    });


    let dpp = mp.daily_plans.map((dp, i) => {
      dp.meal_plan_id = meal_plan.meal_plan_id;
      return insertDailyPlan(dp, i);
    })

    meal_plan.daily_plans = await Promise.all(dpp);
    
    return meal_plan;

  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
}
export const removeUserMealPlan: (id: number, mid: number) => Promise<MealPlan | Error> = async (id, mid) => {
  try{
    let meal_plan = await getUserMealPlanById(id, mid);
    if (isError(meal_plan)){
      return meal_plan;
    }
    let params = [mid];
    let query = `
      DELETE FROM MEAL_PLAN WHERE meal_plan_id = $1;
    `;
    await queryDB(query, params);
    return meal_plan
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
}
