const { Client } = require('pg');

    


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