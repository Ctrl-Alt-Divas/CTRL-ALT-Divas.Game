const express = require('express');
const router = express.Router();

const { saveScore, getLeaderboard, updateImage } = require('../helpers/players');

router.post('/score', async (req, res, next) => {
  try {
    const player = await saveScore(req.body);
    res.send(player);
  } catch (error) {
    next(error);
  }
});

router.patch('/image', async (req, res, next) => {
  try {
    const player = await updateImage(req.headers.authorization.replace('Bearer ', ''), req.body);
    res.send(player);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard();
    res.send(leaderboard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
