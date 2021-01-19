"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserRecipe = exports.insertUserRecipes = exports.getUserRecipes = exports.updateUser = exports.insertUser = exports.getUserByUsername = exports.getUsers = void 0;
const types_1 = require("./types");
const dbUtils_1 = require("./dbUtils");
// import config from '../config';
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
// import secrets from '../secrets';
axios_1.default.defaults.paramsSerializer = (params) => {
    return qs_1.default.stringify(params, { indices: false });
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
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield dbUtils_1.queryDB('SELECT * FROM MP_USER;', []).then((users) => {
            return users;
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUsers = getUsers;
const getUserByUsername = (user_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield dbUtils_1.queryDB(`SELECT * FROM MP_USER WHERE username = $1;`, [user_name]).then((users) => {
            return users[0];
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUserByUsername = getUserByUsername;
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let new_shopping_list = yield insertShoppingList();
        user.shopping_list_id = new_shopping_list.shopping_list_id;
        let [query, params] = dbUtils_1.insertQuery("MP_USER", user);
        return yield dbUtils_1.queryDB(query, params)
            .then((users) => {
            return users[0];
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.insertUser = insertUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [query, params] = dbUtils_1.updateQuery("MP_USER", user, id);
        console.log(query, params);
        return yield dbUtils_1.queryDB(query, params)
            .then((users) => {
            return users[0];
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.updateUser = updateUser;
const insertShoppingList = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = `
    INSERT INTO SHOPPING_LIST 
      DEFAULT VALUES
    RETURNING *;`;
    return yield dbUtils_1.queryDB(query, [])
        .then((shopping_lists) => {
        return shopping_lists[0];
    });
});
const getUserRecipes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield dbUtils_1.queryDB('SELECT recipe_id FROM SAVED_RECIPE WHERE mp_user_id = $1;', [id]).then((recipes) => {
            return recipes;
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUserRecipes = getUserRecipes;
const insertUserRecipes = (mp_user_id, recipes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = [];
        let query = `
      INSERT INTO SAVED_RECIPE (mp_user_id, recipe_id ) VALUES
      ${recipes.map((recipe, i) => {
            params.push(mp_user_id);
            params.push(recipe.recipe_id);
            return `($${2 * i + 1}, $${2 * i + 2})`;
        }).join(',\n')}  RETURNING *`;
        return yield dbUtils_1.queryDB(query, params)
            .then((recipes) => {
            return recipes.map((recipe) => new types_1.Recipe(recipe));
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.insertUserRecipes = insertUserRecipes;
const removeUserRecipe = (mp_user_id, recipe_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let params = [mp_user_id, recipe_id];
        let query = `
      DELETE FROM SAVED_RECIPE WHERE
      mp_user_id = $1 AND recipe_id = $2
      RETURNING *`;
        return yield dbUtils_1.queryDB(query, params)
            .then((recipes) => {
            return recipes.map((recipe) => new types_1.Recipe(recipe));
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.removeUserRecipe = removeUserRecipe;
