const AfricasTalking = require('africastalking');
require('dotenv').config()

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.API_KEY, 
  username: process.env.AT_USERNAME
});


module.exports = async function sendSMS(numbers) {
    console.log('API KEY: ', process.env.API_KEY, '-', process.env.USERNAME)
    // TODO: Send message
    try {
    const result= await africastalking.SMS.send({
        to: numbers, 
        message: 'Hey AT Ninja! Wassup...',
        from: process.env.SENDER_ID
    });
    console.log(result);
    return true // success
    } catch(ex) {
    // console.error(ex);
    return false // failed
    } 
};