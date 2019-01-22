import {Pool} from 'pg';

const connection = new Pool({

    user: 'postgres',
    host: 'localhost',
    database: 'questioner',
    password: '1234567890',
    port: 5000

});

export default connection;