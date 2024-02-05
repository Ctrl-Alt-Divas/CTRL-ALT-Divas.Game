const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, COOKIE_SECRET } = require('dotenv').config({path: '../.env' })
const SALT = 10

const { createPlayer, getPlayerByUsername } = require('../helpers/auth')

//create user account otherwise known register
router.post('/register', async(req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username) {
            throw new Error('Username is required to create an account')
        } else if (!password) {
            throw new Error('Password is required to create an account')
        }

        const hashedPw = await bcrypt.hash(password, SALT);
        const player = await createPlayer({ username, password: hashedPw});
        delete player.password;

        const token = jwt.sign(player, JWT_SECRET)

        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            signed: true,
        });

        res.send({ token, player })

    } catch (error) {
        next(error)
    }
})

//POST - login player
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const player = await getPlayerByUsername(username)
        const validPw = await bcrypt.compare(password, player.password)

        delete player.password

        if (!player) {
            throw new Error('Invalid username');
        } else if (!validPw) {
            throw new Error('Invalid password');
        }
        if (validPw) {
            const token = jwt.sign(player, JWT_SECRET)

            res.cookie('token', token, {
                sameSite: "strict",
                httpOnly: true,
                signed: true,
            })
            res.send({ token, player })
        }
    } catch(error){
        next(error)
    }
})



