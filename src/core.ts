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
  // isError,
  // Region, 
  MPUser, 
  ShoppingList,
  ShoppingListEntry,
  Recipe, 
  isError
} from './types';
import { queryDB, insertQuery, updateQuery } from './dbUtils';
// import config from '../config';
import qs from 'qs';

import axios from 'axios';
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


export const updateUserShoppingListEntry: (mp_user_id: number,
   shopping_list_entry : ShoppingListEntry) => Promise<ShoppingListEntry | Error> = async (
  mp_user_id, shopping_list_entry
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
    
    let fields = ["ingredient_id", "quantity", "measure"]
    let params = [shopping_list_entry.ingredient_id, 
      shopping_list_entry.quantity, shopping_list_entry.measure]
    let query = `
    INSERT INTO SHOPPING_LIST_ENTRY (shopping_list_id, ${fields.join(`, `)}) 
    VALUES ($1, ${params.map((param, i) => `$${i+2}` )})
    ON CONFLICT (ingredient_id) DO UPDATE
      SET ${fields.map((field, i) => 
        `${field} = ${(field == `quantity` ? `SHOPPING_LIST_ENTRY.quantity + `: ``)} $${params.length + i + 2}`)}
      WHERE SHOPPING_LIST_ENTRY.measure = $${params.length + fields.length + 2}
    RETURNING *;`;
    let user_id_param = [user.shopping_list_id] as (string | number)[];
    return await queryDB(query, user_id_param.concat(params).concat(params).concat([shopping_list_entry.measure]))
    .then((entries) => {
      if (entries.length == 0)
        throw new Error("The measure conflicts with the one already in the list")
      return entries[0] as ShoppingListEntry;
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

// export const removeUserShoppingListEntry: (mp_user_id: number, ingredient_id : number) => Promise<ShoppingListEntry | Error> = async (
//   mp_user_id, ingredient_id
// ) => {
//   return {} as ShoppingListEntry;
// }
