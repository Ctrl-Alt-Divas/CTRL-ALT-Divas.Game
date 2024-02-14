const client = require('../db/client');
const jwt = require('jsonwebtoken');

// function to save score for players
async function saveScore(body) {
  try {
    const {
      rows: [player],
    } = await client.query('SELECT * FROM player WHERE id = $1', [body.id]);

    const {
      rows: [updatedPlayer],
    } = await client.query('UPDATE player SET score = $1 WHERE id = $2 RETURNING *', [body.score + player.score, body.id]);
    return updatedPlayer;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update score');
  }
}

// function to update a players profile pic
async function updateImage(token, body) {
  try {
    const decodedPlayer = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedPlayer.id !== body.id) {
      throw new Error('Invalid player');
    }

    const {
      rows: [updatedPlayer],
    } = await client.query('UPDATE player SET image = $1 WHERE id = $2 RETURNING *', [body.image, body.id]);

    return updatedPlayer;
  } catch (error) {
    console.error(error);
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
