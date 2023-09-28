const express = require('express')
const router = express.Router()
const { createUser, getUserByPhone } = require('./models/user')

router.post('/incoming-messages', async (req, res) => {
    const data = req.body;
    // find user
    const user = await getUserByPhone(req.body.from)
    if(!user) {
      // create
      createUser(req.body.from)
    }
    // chat gpt
    res.sendStatus(200);
  });



module.exports = router