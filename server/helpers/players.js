const client = require('../db/client');
const util = require("../api/utils");

async function getAllPlayers() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM player;
        `)
        return rows;
    } catch(error) {
        throw error;
    }
};

async function createPlayer({ username, password, token, score, image }) {
    try {
        const { 
            rows: [player],
        } = await client.query(`
        INSERT INTO player(username, password, token, score, image)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [username, password, token, score, image])
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

async function getPlayerById(player_id) {
    try {
        const { rows: [player] }
        = await client.query(`
        SELECT * 
        FROM player
        WHERE "player_id" = '${player_id}';
        `)
        return player;
    } catch(error) {
        throw error;
    }
};

module.exports = { getAllPlayers, createPlayer, getPlayerByUsername, getPlayerById }