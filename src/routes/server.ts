import express from 'express'
import ServerController from '../controllers/server'

const router = express.Router()

router.post('/create', ServerController.create)

export { router as serverRouter }