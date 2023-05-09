import express, { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import mongoose from 'mongoose'
import { healthcheckRouter } from './routes/healthcheck'
import { serverRouter } from './routes/server'
import { channelRouter } from './routes/channel'

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017`, {
  dbName: 'yakk'
}).then((db) => {
  console.log('MongoDB connected!')
}, (err) => {
  console.log('MongoDb failed to connect!')
  console.log(err)
})

const app = express() 

app.use(json())
app.use('/api', healthcheckRouter)
app.use('/api/server', serverRouter)
app.use('/api/channel', channelRouter)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Yakk.' });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
