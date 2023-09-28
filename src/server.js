import express  from 'express'
import http from 'http'
const app = express()
import sendSMS from './sendSMS.js'
import smsServerRouter  from './smsServer.js'

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(smsServerRouter)


app.get('/',  (req, res) => {
    res.send('created by anonymous')
})

app.get('/incoming-messages', (req, res) => {
    console.log('')
})

app.post('/sendsms', async (req, res)=> {
    const body = req.body
    if(!req.body && !req.body.numbers) {
        return res.status(404).json({
            message: 'missing required fields'
        })
    }
    const feedback = await sendSMS(body.numbers, body.message);
    if(feedback) {
        return res.status(200).json({
            message: 'message sent'
        })
    }
    return res.status(404).json({
        message: 'message not sent'
    })
})

const server = http.createServer(app)

const PORT = 4000


server.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})
// TODO: Call sendSMS function

// TODO: Call start sms server

// smsServer();