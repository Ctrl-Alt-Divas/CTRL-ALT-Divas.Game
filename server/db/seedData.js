const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS player;
      DROP TABLE IF EXISTS character;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building All Tables...');
    await client.query(`
      CREATE TABLE player (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        token VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL
        );
      CREATE TABLE character (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        speed INTEGER NOT NULL,
        jump INTEGER NOT NULL
        );
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log('Creating Initial Data...');
    await client.query(`
      INSERT INTO character (name, description, speed, jump)
      VALUES
        ('Lani', 'description', 50, 50),
        ('Eli', 'description', 50, 50),
        ('Lily Pad', 'description', 50, 50),
        ('Fancypants', 'description', 50, 50)
        `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
