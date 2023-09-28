const express = require('express')
const router = express.Router()
require()
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
    sendSMS(req.body.from, req.body.text)
    res.sendStatus(200);
  });


async function sendSMS(number, message) {
    // TODO: Send message
    try {
    const result= await africastalking.SMS.send({
        to: [number], 
        message: message,
        from: process.env.SENDER_ID
    });
    console.log(result);
    return true // success
    } catch(ex) {
    // console.error(ex);
    return false // failed
    } 
};

module.exports = router