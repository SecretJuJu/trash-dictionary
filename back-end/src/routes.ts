import adminRouter from './app/admin/routes'
import { Router } from 'express'

const router = Router()

router.use('/api/admin', adminRouter)

export default router