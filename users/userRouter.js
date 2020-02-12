const express = require('express');
const Users = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if(Users.findById(req.params.id)) {
    // got a valid ID
    Users.findById(req.params.id)
    .then(user => {
      req.user = user
      next()
    })
  }
  else {
    // User does not exist
    res.status(400).json({ message: "invalid user id" })
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body) {
    // request has a body
    if (req.body.name) {
      // name field submitted
      next()
    }
    else {
      // no name field
      res.status(400).json({ message: "missing required name field" })
    }
  }
  else {
    // no body
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
