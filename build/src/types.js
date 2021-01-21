"use strict";
/*********
 * Type definitions
 *   TypeScript interfaces and types should be defined here!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
const isError = (arg) => {
    return arg && arg.error;
};
exports.isError = isError;
