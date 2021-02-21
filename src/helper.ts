/*********
 * Helper
 *   Here you can define all those functions that can be
 *   useful in several places but does not belong to any
 *   of the other files.
 */

import { Request } from 'express';

/**
 * Extract a specific parameter from the query-string
 * @param req The request (as given in the controller)
 * @param param The id of the parameter to be extracted
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
export const getNumberFromRequest: (req: Request, param: string) => number  = (
  req,
  param
) => {
  let value = req.query[param];

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    return parseInt(value);
  } catch (e) {
    console.error(`Error extracting parameter ${param}:`, e);
    return NaN;
  }
};

export const parseNumber: (param: string) => number = (
  param
) => {
  if (typeof param !== 'string') {
    return NaN
  }
  try {
    return parseInt(param);
  } catch (e) {
     return NaN;
  }
};

/**
 * Extract id from the request query-string
 * @param req The request (as given in the controller)
 * @return the id if the parameter is correct and
 * available, false otherwise
 */
export const getIdFromRequest: (req: Request, id_name?:string) => number = (req, id_name?) => {
  return parseNumber(req.params[id_name || "id"]);
};
