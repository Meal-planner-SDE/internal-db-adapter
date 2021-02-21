/*********
 * Main controller
 *   Here you can define all the processing logics of your endpoints.
 *   It's a good approach to keep in here only the elaboration of the inputs
 *   and outputs, with complex logics inside other functions to improve
 *   reusability and maintainability. In this case, we've defined the complex
 *   logics inside the core.ts file!
 *   In a huge project, you should have multiple controllers, divided
 *   by the domain of the operation.
 */

import { Request, Response } from 'express';

import { isError } from './types';
import {
  // getHello,
  // getBarChart,
  // getRanking,
  // getRegionById,
  // getRegions, getCasesByRegionId, getLineChart,
  getUsers, getUserByUsername, insertUser, updateUser,
  getUserRecipes, insertUserRecipes, removeUserRecipe,
  getUserShoppingListEntries, updateUserShoppingListEntries,
  getUserMealPlans, getUserMealPlanById, insertUserMealPlan, removeUserMealPlan
} from './core';
import {
  // getDateFromRequest,
  getIdFromRequest,
  // getNumberFromRequest,
} from './helper';



export const users = async (req: Request, res: Response) => {

  let users = await getUsers();
  if (isError(users)){
    res.status(400);
  }
  res.send(users);
};

export const userByUsername = async (req: Request, res: Response) => {
  let user = await getUserByUsername(req.params.username);
  if (isError(user)){
    res.status(400);
  }
  res.send(user);
};

export const postUser = async (req: Request, res: Response) => {
  let user = await insertUser(req.body);
  if (isError(user)){
    res.status(400);
  }
  res.send(user);
};

export const patchUser = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let user = await updateUser(id, req.body);
    if (isError(user)){
      res.status(400);
    }
    res.send(user)
  };
};

export const userRecipes = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let recipes = await getUserRecipes(id)
    if (isError(recipes)){
      res.status(400);
    }
    res.send(recipes)
  };
};

export const postUserRecipes = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let recipes = await insertUserRecipes(id, req.body);
    if (isError(recipes)){
      res.status(400);
    }
    res.send(recipes)
  };
};

export const deleteUserRecipe = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  const rid = getIdFromRequest(req, 'rid');
  if (isNaN(id) || isNaN(rid)){
    res.status(400);
    res.send({'error' : 'id and rid should be integers.'})
  } else {
    let recipe = await removeUserRecipe(id, rid);
    if (isError(recipe)){
      res.status(400);
    }
    res.send(recipe)
  };
};

export const userShoppingListEntries = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let entries = await getUserShoppingListEntries(id);
    if (isError(entries)){
      res.status(400);
    }
    res.send(entries)
  };
}
export const patchUserShoppingListEntries = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let entries = await updateUserShoppingListEntries(id, req.body);
    if (isError(entries)){
      res.status(400);
    }
    res.send(entries)
  };
}

export const userMealPlans = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let meal_plans = await getUserMealPlans(id);
    if (isError(meal_plans)){
      res.status(400);
    }
    res.send(meal_plans)
  };
}
export const userMealPlanById = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  const mid = getIdFromRequest(req, 'mid')
  if (isNaN(id) || isNaN(mid)){
    res.status(400);
    res.send({'error' : 'id and mid should be integers.'})
  } else {
    let meal_plan = await getUserMealPlanById(id, mid);
    if (isError(meal_plan)){
      res.status(400);
    }
    res.send(meal_plan)
  };
}
export const postUserMealPlan = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  if (isNaN(id)){
    res.status(400);
    res.send({'error' : 'id should be an integer.'})
  } else {
    let meal_plan = await insertUserMealPlan(id, req.body);
    if (isError(meal_plan)){
      res.status(400);
    }
    res.send(meal_plan)
  };
}
export const deleteUserMealPlan = async (req: Request, res: Response) => {
  const id = getIdFromRequest(req);
  const mid = getIdFromRequest(req, 'mid')
  if (isNaN(id) || isNaN(mid)){
    res.status(400);
    res.send({'error' : 'id and mid should be integers.'})
  } else {
    let meal_plan = await removeUserMealPlan(id, mid);
    if (isError(meal_plan)){
      res.status(400);
    }
    res.send(meal_plan)
  };
}