import pg from "pg";
// for this project not using .env
const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'crud_test',
    password: 'root',
    port: 5432,
});

export default pool;