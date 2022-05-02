import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import model from './model'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => { res.sendFile(path.join(__dirname, '../src/public/index.html')) })
app.use(express.static(path.join(__dirname, '../src/public/')))
app.use(express.static(path.join(__dirname, './public')))

mongoose.connect('your mongodb uri here')

app.post('/login', async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password

    const user = await model.findOne({ username: username, password: password })
    if(!user) return res.send({ error: 'inv_cred' })
    res.send({ msgs: user.msgs })
})

app.post('/register', async(req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password

    const user = await model.findOne({ username: username })
    if(user) return res.send({ error: 'user_exists' })
    await model.create({ username: username, password: password, msgs: [] })
})

app.post('/', async(req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
    const user = await model.findOne({ username: username, password: password })
    res.send({ msgs: user?.msgs })
})

app.get(`/:username`, async(req: Request, res: Response) => {
    const username = req.params.username
    const user = await model.findOne({ username: username })
    if(!user) return res.sendFile(path.join(__dirname, '../src/public/404_profile.html'))
    res.sendFile(path.join(__dirname, '../src/public/profile.html'))
})

app.post('/:username', async(req: Request, res: Response) => {
    const username = req.body.username
    res.send({ username: username })
})

app.post('/:username/send', async (req: Request, res: Response) => {
    const username = req.body.username
    const message = req.body.message
    await model.findOneAndUpdate({ username: username }, { $push: { msgs: message } }, { upsert: true })
})

app.listen(3000, () => console.log('App Listening on localhost:3000'))