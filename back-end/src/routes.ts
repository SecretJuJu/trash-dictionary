import adminRouter from './app/admin/routes'
import feedRouter from './app/feed/routes'

import { Router } from 'express'

const router = Router()

router.use('/api/admin', adminRouter)
router.use('/api/feed',feedRouter)

export default router