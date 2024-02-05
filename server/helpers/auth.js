const client = require('../db/client');
const util = require("../api/utils");

//currently deleted the token stuff because I don't fully understand it or how to implement it
async function createPlayer({ username, password }) {
    try {
        const { 
            rows: [player],
        } = await client.query(`
        INSERT INTO player(username, password)
        VALUES ($1, $2)
        RETURNING *;
        `, [username, password])
        return player;
    } catch(error) {
        throw error;
    }
};

async function getPlayerByUsername(username) {
    try {
        const { rows: [player] } = await client.query(`
        SELECT *
        FROM player
        WHERE player.username = '${username}';
        `)
        return player;
    } catch(error) {
        throw error;
    }
};

module.exports = { createPlayer, getPlayerByUsername }