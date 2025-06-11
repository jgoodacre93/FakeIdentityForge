
const { Pool } = require('pg');

async function setupLocalDatabase() {
  // Connect to PostgreSQL server (not specific database)
  const adminPool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres' // Connect to default postgres database
  });

  try {
    // Create the identity_db database if it doesn't exist
    await adminPool.query(`
      SELECT 1 FROM pg_database WHERE datname = 'identity_db'
    `).then(async (result) => {
      if (result.rows.length === 0) {
        console.log('Creating identity_db database...');
        await adminPool.query('CREATE DATABASE identity_db');
        console.log('Database created successfully!');
      } else {
        console.log('Database identity_db already exists.');
      }
    });
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await adminPool.end();
  }

  // Now connect to the identity_db and create tables
  const dbPool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'identity_db'
  });

  try {
    console.log('Connected to identity_db successfully!');
    console.log('Run "npm run db:push" to create the tables.');
  } catch (error) {
    console.error('Error connecting to identity_db:', error);
  } finally {
    await dbPool.end();
  }
}

setupLocalDatabase();
