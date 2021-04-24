require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

const users = [
  {
    "id": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
    "username": "sallyStudent",
    "password": "c00d1ng1sc00l",
    "favoriteClub": "Cache Valley Stone Society",
    "newsLetter": "true"
  },
  {
    "id": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
    "username": "johnBlocton",
    "password": "veryg00dpassw0rd",
    "favoriteClub": "Salt City Curling Club",
    "newsLetter": "false"
  }
]

app.post('/user', (req, res) => {
  const { username, password, favoriteClub, newsletter=false } 
  = req.body;

  if (!username) {
    return res
      .status(400)
      .send('username required');
  }

  if (!password) {
    return res
      .status(400)
      .send('password required');
  }

  if(!favoriteClub) {
    return res
      .status(400)
      .send('favorite club required');
  }

  if (username.length < 6 || username.length > 20) {
    return res
      .status(400)
      .send('username must be between 6 and 20 characters');
  }

  if (password.length < 8 || password.length > 36) {
    return res
      .status(400)
      .send('password must be between 8 and 36 characters')
  }

  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return res
      .status(400)
      .send('password must contain at least one digit');
  }

  const clubs = [
    'Cache Valley Stone Society',
    'Ogden Curling Club',
    'Park City Curling Club',
    'Salt Lake City Curling Club',
    'Utah Olympic Oval Curling Club'
  ];  

  if (!clubs.includes(favoriteClub)) {
    return res
      .status(400)
      .send('Not a valid club');
  }
  
  // const id = 
  const newUser = {
    id,
    username,
    password,
    favoriteClub,
    newsLetter
  };

  users.push(newUser);

  res.send('All validation passed');
});

app.get('/', (req, res) => {
  res
    .send('A GET request');
});

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app 



