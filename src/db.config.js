const { Pool } = require("pg");

console.log("DATABASE_URL", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
