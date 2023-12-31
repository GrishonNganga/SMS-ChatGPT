import express  from 'express'
import AfricasTalking  from 'africastalking'
import { chatGptPrompt} from "./chatgpt/index.js"
import { createUser, getUserByPhone } from './models/user.js'

const router = express.Router()
import 'dotenv/config'

const africastalking = AfricasTalking({
  apiKey: process.env.API_KEY, 
  username: process.env.AT_USERNAME
});


router.post('/incoming-messages', async (req, res) => {
    const data = req.body;
    // find user
    const user = await getUserByPhone(req.body.from)
    if(!user) {
      // create
      createUser(req.body.from)
    } 
    // chat gpt
    const response = await chatGptPrompt(req.body.text)
    console.log(response)
    sendSMS(req.body.from, response||'something went wrong')
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
    console.error(ex);
    return false // failed
    } 
};

export default router