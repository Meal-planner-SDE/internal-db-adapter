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
  RecipeRaw, 
  Recipe 
} from './types';
import { queryDB, insertQuery, updateQuery } from './dbUtils';
// import config from '../config';
import qs from 'qs';

import axios from 'axios';
// import secrets from '../secrets';
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { indices: false });
};


    
//#region --- EXAMPLE ---

// export const getHello: (name: string) => { text: string } = (name) => {
//   return {
//     text: `Hello ${name}`,
//   };
// };

//#endregion

//#region --- REGIONS and CASES ---

// export const getRegions: () => Promise<Region[] | Error> = async () => {
//   try {
//     const regions = await axios.get<Region[]>(`${config.URL_API_DATA}/regions`);
//     return regions.data;
//   } catch (e) {
//     console.error(e);
//     return {
//       error: e.toString(),
//     };
//   }
// };

// export const getRegionById: (id: number) => Promise<Region | Error> = async (id) => {
//   try {
//     const region = await axios.get<Region>(`${config.URL_API_DATA}/region/${id}`);
//     return region.data;
//   } catch (e) {
//     console.error(e);
//     return {
//       error: e,
//     };
//   }
// };

// export const getCasesByRegionId: (
//   id: number,
//   year: number,
//   month: number,
//   day: number
// ) => Promise<Entry | Error> = async (id, year, month, day) => {
//   try {
//     const cases = await axios.get<Entry>(`${config.URL_API_DATA}/region/${id}/cases/${year}/${month}/${day}`);
//     return cases.data;
//   } catch (e) {
//     console.error(e);
//     return {
//       error: e,
//     };
//   }
// };

//#endregion

//#region --- LOCAL ELABORATIONS ---

// export const getRanking: (
//   n: number,
//   ord: string,
//   year: number,
//   month: number,
//   day: number
// ) => Promise<CasesPerRegion[]> = async (n, ord, year, month, day) => {
//   const regions = await getRegions();

//   let ranks: CasesPerRegion[] = [];
//   if (!isError(regions)) {
//     for (let i = 0; i < regions.length; i++) {
//       const cases = await getCasesByRegionId(regions[i].id, year, month, day);
//       if (!isError(cases)) {
//         ranks.push({
//           region: regions[i],
//           cases: cases.total_positive,
//         });
//       }
//     }
//   }

//   ranks = ranks.sort((a: CasesPerRegion, b: CasesPerRegion) => b.cases - a.cases);
//   if (ord === 'asc') {
//     ranks = ranks.reverse();
//   }
//   return ranks.slice(0, n);
// };

//#endregion

//#region --- CHARTS ---

// export const getBarChart: (
//   year: number,
//   month: number,
//   day: number
// ) => Promise<File | Error> = async (year, month, day) => {
//   const regions = await getRegions();

//   if (!isError(regions)) {
//     let labels = '';
//     let data = '';
//     let maxCases = 10000;

//     // For each region, take the total number of positives and create the parameters query
//     for (let i = 0; i < regions.length; i++) {
//       const cases = await getCasesByRegionId(regions[i].id, year, month, day);
//       if (!isError(cases)) {
//         labels += regions[i].name.replace('P.A. ', '').slice(0, 4) + '.|';
//         data += cases.total_positive + ',';
//         if (cases.total_positive > maxCases) {
//           maxCases = cases.total_positive;
//         }
//       }
//     }

//     // remove trailing comma and pipe
//     if (labels.length > 0) {
//       labels = labels.slice(0, -1);
//     }
//     if (data.length > 0) {
//       data = data.slice(0, -1);
//     }

//     // Let's make the request to google chart API to create the chart
//     try {
//       const response = await axios.get<File>('https://chart.googleapis.com/chart', {
//         responseType: 'arraybuffer', // Needed because the response is not a json but a binary file!
//         params: {
//           cht: 'bvg',
//           chs: `700x250`,
//           chtt: 'Covid Infections',
//           chds: `0,${maxCases}`,
//           chd: `t:${data}`,
//           chco: '118ab2',
//           chl: `${labels}`,
//           chxt: 'x,y',
//           chxr: `1,0,${maxCases}`,
//         },
//       });

//       return response.data;
//     } catch (e) {
//       console.error(e);
//       return {
//         error: e,
//       };
//     }
//   } else {
//     return regions; // It's an error! :( We return it as is.
//   }
// };

// export const getLineChart: (
//   id: number,
//   year: number,
//   month: number,
// ) => Promise<File | Error> = async (id, year, month) => {
//   const region = await getRegionById(id);

//   if (!isError(region)) {
//     let labels = '';
//     let data = '';
//     let maxCases = 10000;

//     // Get cases for each day of the month
//     for (let i = 1; i <= 31; i++) {
//       const cases = await getCasesByRegionId(region.id, year, month, i);
//       // If the day does not exists, it will be an error,
//       // so even if we're trying to get 31th of February,
//       // it will not be added to the labels and data!
//       if (!isError(cases)) {
//         labels += i + '|';
//         data += cases.total_positive + ',';
//         if (cases.total_positive > maxCases) {
//           maxCases = cases.total_positive;
//         }
//       }
//     }

//     // remove trailing comma and pipe
//     if (labels.length > 0) {
//       labels = labels.slice(0, -1);
//     }
//     if (data.length > 0) {
//       data = data.slice(0, -1);
//     }

//     // Let's make the request to google chart API to create the chart
//     try {
//       const response = await axios.get<File>('https://chart.googleapis.com/chart', {
//         responseType: 'arraybuffer', // Needed because the response is not a json but a binary file!
//         params: {
//           cht: 'lc',
//           chs: `600x250`,
//           chtt: 'Covid Infections',
//           chds: `0,${maxCases}`,
//           chd: `t:${data}`,
//           chdl: region.name,
//           chco: '118ab2',
//           chl: `${labels}`,
//           chxt: 'x,y',
//           chxr: `1,0,${maxCases}`,
//         },
//       });

//       return response.data;
//     } catch (e) {
//       console.error(e);
//       return {
//         error: e,
//       };
//     }
//   } else {
//     return region; // It's an error! :( We return it as is.
//   }
// };

//#endregion


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
    let [query, params] = updateQuery("MP_USER", user, id);
    console.log(query, params);


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

export const getUserRecipes: (id:number) => Promise<Recipe[] | Error> = async (id) => {
  try {
    return await queryDB('SELECT recipe_id FROM SAVED_RECIPE WHERE mp_user_id = $1;', [id]).then((recipes) => {
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
      ).join(',\n')}  RETURNING *`;
    return await queryDB(query, params)
    .then((recipes) => {
      return (recipes as RecipeRaw[]).map((recipe) => new Recipe(recipe));
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
    let params = [mp_user_id, recipe_id];
    let query = `
      DELETE FROM SAVED_RECIPE WHERE
      mp_user_id = $1 AND recipe_id = $2
      RETURNING *`;
    return await queryDB(query, params)
    .then((recipes) => {
      return (recipes as RecipeRaw[]).map((recipe) => new Recipe(recipe));
    });
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};