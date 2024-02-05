const client = require('../db/client');

// function to save score for players
async function saveScore(body) {
  try {
    const {
      rows: [updatedPlayer],
    } = await client.query('UPDATE player SET score = $1 WHERE id = $2 RETURNING *', [body.score, body.id]);
    return updatedPlayer;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update score');
  }
}

// function to update a players profile pic
async function updateImage(token, body) {
  try {
    const {
      rows: [player],
    } = await client.query('SELECT * FROM player WHERE password = $1', [token]);

    if (player.id !== body.id) {
      throw new Error('Invalid player');
    }

    const {
      rows: [updatedPlayer],
    } = await client.query('UPDATE player SET image = $1 WHERE id = $2 RETURNING *', [body.image, body.id]);
    return updatedPlayer;
  } catch (error) {
    throw new Error('Unable to update player image');
  }
}

// function to get the players in order of score 'leaderboard'
async function getLeaderboard() {
  try {
    const { rows: players } = await client.query('SELECT * FROM player ORDER BY score DESC');
    return players;
  } catch (error) {
    throw new Error('Unable to retrieve leaderboard');
  }
}

module.exports = {
  getLeaderboard,
  saveScore,
  updateImage,
};
