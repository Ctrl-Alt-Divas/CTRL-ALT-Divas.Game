const client = require("../db/client");
const util = require("./util");

const getAllCharacters = async () => {
  try {
    const { rows } = await client.query(`
        SELECT * FROM Character;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCharacterById = async (characterId) => {
  try {
    const {
      rows: [character],
    } = await client.query(`
    SELECT * FROM Character WHERE "id" = ${characterId};
 `);
    return character;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
};
