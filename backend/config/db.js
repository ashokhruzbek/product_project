const { Pool } = require("pg");

const pool = new Pool({
  connectionString: 'postgresql://sanatbek:wOr848KDDsFPmNv7VPrtd6vmOWY5CVXF@dpg-cvhoq5trie7s73e8tjhg-a.oregon-postgres.render.com/sherbek',
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

module.exports = pool;