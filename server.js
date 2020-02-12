const express = require('express');
const Posts = require('./posts/postDb')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express();
server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('api/users', userRouter)
server.get('api/posts', userRouter)

//custom middleware

function logger(req, res, next) {
  const date = new Date
  const hour = date.getHours()
  const minute = date.getMinutes()
  const ms = date.getMilliseconds()
  console.log(`method: ${req.method}`)
  console.log(`url: ${req.originalUrl}`)
  console.log(`time: ${hour}:${minute}:${ms}`)
  next()
}

module.exports = server;
