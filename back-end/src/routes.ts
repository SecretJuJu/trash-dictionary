import adminRouter from './app/admin/routes'
import feedRouter from './app/feed/routes'
import mediaRouter from './app/media/routes'
import { Router } from 'express'

const router = Router()

router.use('/api/admin', adminRouter)
router.use('/api/feed',feedRouter)
router.use('/api/media',mediaRouter)
export default router