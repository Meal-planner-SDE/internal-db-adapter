const { Client } = require('pg');

    


export const queryDB: (query: string) => Promise<Object[]> = async (
    query
    ) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    return client.query(query).then((result : any) => {
        client.end();
        return result.rows;
    })
    
};