import bcrypt from 'bcryptjs';
import sql from '../helpers/sql';

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let newPool;
if (process.env.DATABASE_URL) {
  const connectionString = process.env.DATABASE_URL;
  newPool = new Pool({
    connectionString,
  });
} else {
  newPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  });
}

const connect = async () => await newPool.connect();

const tables = async () => {
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
  const admin = [
    process.env.ADMIN_FIRSTNAME,
    process.env.ADMIN_LASTNAME,
    process.env.ADMIN_OTHER,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PHONENUMBER,
    process.env.ADMIN_USERNAME,
    hash,
    process.env.IS_ADMIN,
  ];

  const user = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    othername VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    phonenumber VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(150) NOT NULL,
    registered TIMESTAMP default current_timestamp,
    isAdmin BOOLEAN NOT NULL default FALSE
);`;

  const meetup = `CREATE TABLE IF NOT EXISTS
meetups(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    location VARCHAR(150) NOT NULL,
    images text[],
    topic VARCHAR(60) NOT NULL,
    happeningon DATE NOT NULL,
    tags text[],
    status VARCHAR(30) DEFAULT 'ACTIVE'
);`;

  const question = `CREATE TABLE IF NOT EXISTS
questions(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP default current_timestamp,
    createdby INTEGER REFERENCES users(id),
    meetup INTEGER REFERENCES meetups(id),
    title VARCHAR(60) NOT NULL,
    body TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0
);`;

  const rsvp = `CREATE TABLE IF NOT EXISTS
rsvps(
    id SERIAL PRIMARY KEY,
    meetupid INTEGER REFERENCES meetups(id),
    userid INTEGER REFERENCES users(id),
    response VARCHAR(20) NOT NULL
);`;

  const vote = `CREATE TABLE IF NOT EXISTS
votes(
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(id),
  questionid INTEGER REFERENCES questions(id),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
);`;

  const comment = `CREATE TABLE IF NOT EXISTS
comments(
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(id),
  questionid INTEGER REFERENCES questions(id),
  comment text
);`;

  const connection = await connect();
  await connection.query(user);
  await connection.query(meetup);
  await connection.query(question);
  await connection.query(rsvp);
  await connection.query(vote);
  await connection.query(comment);
  await connection.query(sql.admin, admin);
};

tables();

const database = async (sql, data = []) => {
  const connection = await connect();
  try {
    const result = await connection.query(sql, data);
    return result.rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
};

export default database;
export { tables };
