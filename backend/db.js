const { Pool } = require('pg')
require('dotenv').config()

// If we are on a hosting service, they usually provide a DATABASE_URL
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    
    ...(process.env.DATABASE_URL ? {} : {
        user: "postgres",
        host: "localhost",
        database: "PerfumeShop",
        password: process.env.POSTGRES_PASSWORD,
        port: 5432
    }),
    
    ssl: isProduction ? { rejectUnauthorized: false } : false
})

module.exports = pool;