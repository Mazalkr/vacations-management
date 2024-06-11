import mysql from 'mysql2';
import { promisify } from 'util';
import config from 'config';

// connection- connection to database.
// pool- מאגר of connections. pool is better than one connection because multiple user can access to the DB. 
// we will use 'mysql.createPool' instead of 'mysql.createConnection'.

export const pool = mysql.createPool({
    connectionLimit: config.get<number>('mysql.connectionLimit'),  
    host: config.get<string>('mysql.host'),
    user: config.get<string>('mysql.user'),
    password: config.get<string>('mysql.password'),
    database: config.get<string>('mysql.database'),
    port: config.get<number>('mysql.port')
});
// we get all the details from phpMyAdmin 'Database server' (click on admin type in line MySql in XAMPP)
// MUST add to pool is: host, user, password, database, port.

const query = promisify(pool.query).bind(pool);   // pool.query() get callback parameter, so we prefer to promisify it.
// bind = it says that "your 'this' is 'pool'.
// if we didn't add it so it refers to the global object ('query') as 'this'.
export default query;