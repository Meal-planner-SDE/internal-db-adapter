const { Client } = require('pg');

    
const getIdField: (table:string) => string = (table) => {
    return table.toLowerCase().concat('_id');
}

export const queryDB: (query: string, params: Object) => Promise<Object[]> = async (
    query, params
    ) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    return client.query(query, params).then((result : any) => {
        client.end();
        return result.rows;
    })
    
};

export const insertQuery: (table: string, entity: Object) => [string, string[]] = (
    table, entity
) => {
    let fields = [];
    let params = [];
    let id_field = getIdField(table)
    for (const [property, value] of Object.entries(entity)) {
      if (property != id_field && value != null){
        fields.push(property);
        params.push(value);
      }
    }
    if (params.length == 0){
        throw new Error("No field given");
    } 
    return [`
    INSERT INTO MP_USER 
      (${fields.join(', ')})
    VALUES (${params.map((_, i) => `$${i+1}`).join(`, `)})
    
    RETURNING *; `, params];
}

export const updateQuery: (table: string, entity:Object, id:number) => [string, string[]] = (
    table, entity, id
) => {
    let fields = [];
    let params = [];
    let id_field = getIdField(table)
    for (const [property, value] of Object.entries(entity)) {
      if (property != id_field && value != null){
        fields.push(property);
        params.push(value);
      }
    }

    if (params.length == 0){
        throw new Error("No field to update found");
    }
    params.push(id); 
    return [`
    UPDATE MP_USER SET 
      ${fields.map((field, i) => `${field} = $${i+1}`).join(',\n')}
    WHERE mp_user_id = $${params.length}
    RETURNING *;`, params];
} 