import mysql from 'mysql2/promise';

// Create connection pool using Cloudron environment variables
export const pool = mysql.createPool({
  host: process.env.CLOUDRON_MYSQL_HOST,
  port: parseInt(process.env.CLOUDRON_MYSQL_PORT || '3306'),
  user: process.env.CLOUDRON_MYSQL_USERNAME,
  password: process.env.CLOUDRON_MYSQL_PASSWORD,
  database: process.env.CLOUDRON_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});