import express from 'express'
import ChannelController from '../controllers/channel'

const router = express.Router()

router.post('/create', ChannelController.create)

export { router as channelRouter }