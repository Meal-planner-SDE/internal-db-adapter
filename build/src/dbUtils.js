"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuery = exports.insertQuery = exports.queryDB = void 0;
const { Client } = require('pg');
const getIdField = (table) => {
    return table.toLowerCase().concat('_id');
};
const queryDB = (query, params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    return client.query(query, params).then((result) => {
        client.end();
        return result.rows;
    });
});
exports.queryDB = queryDB;
const insertQuery = (table, entity) => {
    let fields = [];
    let params = [];
    let id_field = getIdField(table);
    for (const [property, value] of Object.entries(entity)) {
        if (property != id_field && value != null) {
            fields.push(property);
            params.push(value);
        }
    }
    if (params.length == 0) {
        throw new Error("No field given");
    }
    return [`
    INSERT INTO MP_USER 
      (${fields.join(', ')})
    VALUES (${params.map((_, i) => `$${i + 1}`).join(`, `)})
    
    RETURNING *; `, params];
};
exports.insertQuery = insertQuery;
const updateQuery = (table, entity, id, non_update_fields) => {
    non_update_fields || (non_update_fields = []);
    let fields = [];
    let params = [];
    let id_field = getIdField(table);
    for (const [property, value] of Object.entries(entity)) {
        if (property != id_field && !(property in non_update_fields) && value != null) {
            fields.push(property);
            params.push(value);
        }
    }
    if (params.length == 0) {
        throw new Error("No field to update found");
    }
    params.push(id);
    return [`
    UPDATE MP_USER SET 
      ${fields.map((field, i) => `${field} = $${i + 1}`).join(',\n')}
    WHERE mp_user_id = $${params.length}
    RETURNING *;`, params];
};
exports.updateQuery = updateQuery;
