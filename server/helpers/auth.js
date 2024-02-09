const client = require('../db/client');
const util = require('../api/utils');

//currently deleted the token stuff because I don't fully understand it or how to implement it
async function createPlayer({ username, password, score, image }) {
  try {
    const {
      rows: [player],
    } = await client.query(
      `
        INSERT INTO player(username, password, score, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [username, password, score, image]
    );
    return player;
  } catch (error) {
    if (error?.constraint === 'player_username_key') {
      return 'Username already taken';
    }
  }
}

async function getPlayerByUsername(username) {
  try {
    const {
      rows: [player],
    } = await client.query(`
        SELECT *
        FROM player
        WHERE player.username = '${username}';
        `);
    return player;
  } catch (error) {
    throw error;
  }
}

module.exports = { createPlayer, getPlayerByUsername };
