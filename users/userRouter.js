const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert({...req.body, user_id: req.params.id})
  .then(post => {
    res.status(201).json(post)
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(result => {
    res.status(200).json(result)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if(Users.getById(req.params.id)) {
    // got a valid ID
    Users.getById(req.params.id)
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
  if (req.body) {
    // request has a body
    if (req.body.text) {
      // text field submitted
      next()
    }
    else {
      // no text field
      res.status(400).json({ message: "missing required text field" })
    }
  }
  else {
    // no body
    res.status(400).json({ message: "missing post data" })
  }
}

module.exports = router;
