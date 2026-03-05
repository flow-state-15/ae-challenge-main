import pg from 'pg';

/*
On every query this is creating a new cold tcp connection to the db. 
Takes far longer than warm connection and if max number of clients are reached the db might crash.
This is not safe or efficient, and ACID compliance can't be enforced.
*/
export const query = async (query: string, values: any[] = []): Promise<pg.QueryResult<any>> => {
  const {Client} = pg;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const res = await client.query(query, values);
  await client.end();
  return res;
}

/*
By pooling, each connection is warm and recycles when a query is done.
This is more efficient by letting pg manage connections and allows for ACID compliant architecture.
*/
export const pool = new pg.Pool({connectionString: process.env.DATABASE_URL, max: 50});
