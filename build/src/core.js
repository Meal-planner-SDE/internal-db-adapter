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
exports.updateUserShoppingListEntry = exports.getUserShoppingListEntries = exports.removeUserRecipe = exports.insertUserRecipes = exports.getUserRecipes = exports.updateUser = exports.insertUser = exports.getUserById = exports.getUserByUsername = exports.getUsers = void 0;
const types_1 = require("./types");
const dbUtils_1 = require("./dbUtils");
// import config from '../config';
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
// import secrets from '../secrets';
axios_1.default.defaults.paramsSerializer = (params) => {
    return qs_1.default.stringify(params, { indices: false });
};
const checkUserExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield exports.getUserById(id); // if user does not exists throws an error
    if (types_1.isError(user))
        throw user.error;
});
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
            if (users.length == 0)
                throw new Error("User not found");
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
const getUserById = (mp_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield dbUtils_1.queryDB(`SELECT * FROM MP_USER WHERE mp_user_id = $1;`, [mp_user_id]).then((users) => {
            if (users.length == 0)
                throw new Error("User not found");
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
exports.getUserById = getUserById;
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let new_shopping_list = yield insertShoppingList();
        user.shopping_list_id = new_shopping_list.shopping_list_id;
        let [query, params] = dbUtils_1.insertQuery("MP_USER", user);
        console.log(query);
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
        let [query, params] = dbUtils_1.updateQuery("MP_USER", user, id, ["shopping_list_id"]);
        console.log(query, params);
        return yield dbUtils_1.queryDB(query, params)
            .then((users) => {
            if (users.length == 0)
                throw new Error("User not found");
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
const getUserRecipes = (mp_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkUserExists(mp_user_id);
        return yield dbUtils_1.queryDB('SELECT recipe_id FROM SAVED_RECIPE WHERE mp_user_id = $1;', [mp_user_id]).then((recipes) => {
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
        }).join(',\n')}  RETURNING recipe_id`;
        return yield dbUtils_1.queryDB(query, params)
            .then((recipes) => {
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
exports.insertUserRecipes = insertUserRecipes;
const removeUserRecipe = (mp_user_id, recipe_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkUserExists(mp_user_id); // if user does not exists throws an error
        let params = [mp_user_id, recipe_id];
        let query = `
      DELETE FROM SAVED_RECIPE WHERE
      mp_user_id = $1 AND recipe_id = $2
      RETURNING recipe_id`;
        return yield dbUtils_1.queryDB(query, params)
            .then((recipes) => {
            if (recipes.length == 0)
                throw new Error(`The user with id ${mp_user_id} has not saved recipe with id ${recipe_id}`);
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
exports.removeUserRecipe = removeUserRecipe;
const getUserShoppingListEntries = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkUserExists(id);
        return yield dbUtils_1.queryDB(`SELECT * FROM SHOPPING_LIST_ENTRY WHERE shopping_list_id = 
      (SELECT MP_USER.shopping_list_id FROM MP_USER WHERE mp_user_id = $1);`, [id]).then((entries) => {
            return entries;
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUserShoppingListEntries = getUserShoppingListEntries;
const updateUserShoppingListEntry = (mp_user_id, shopping_list_entry) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let entry = await getUserShoppingListEntry(mp_user_id, shopping_list_entry.ingredient_id);
        // if (entry === undefined){
        //   // insert new tuple
        // } else {
        //   // check measures 
        // }
        let user = yield exports.getUserById(mp_user_id);
        if (types_1.isError(user)) {
            return user;
        }
        let fields = ["ingredient_id", "quantity", "measure"];
        let params = [shopping_list_entry.ingredient_id,
            shopping_list_entry.quantity, shopping_list_entry.measure];
        let query = `
    INSERT INTO SHOPPING_LIST_ENTRY (shopping_list_id, ${fields.join(`, `)}) 
    VALUES ($1, ${params.map((param, i) => `$${i + 2}`)})
    ON CONFLICT (ingredient_id) DO UPDATE
      SET ${fields.map((field, i) => `${field} = ${(field == `quantity` ? `SHOPPING_LIST_ENTRY.quantity + ` : ``)} $${params.length + i + 2}`)}
      WHERE SHOPPING_LIST_ENTRY.measure = $${params.length + fields.length + 2}
    RETURNING *;`;
        let user_id_param = [user.shopping_list_id];
        return yield dbUtils_1.queryDB(query, user_id_param.concat(params).concat(params).concat([shopping_list_entry.measure]))
            .then((entries) => {
            if (entries.length == 0)
                throw new Error("The measure conflicts with the one already in the list");
            return entries[0];
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.updateUserShoppingListEntry = updateUserShoppingListEntry;
// export const removeUserShoppingListEntry: (mp_user_id: number, ingredient_id : number) => Promise<ShoppingListEntry | Error> = async (
//   mp_user_id, ingredient_id
// ) => {
//   return {} as ShoppingListEntry;
// }
