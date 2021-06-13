import fs from "fs"
import multer from "multer"
import env from 'config/env'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = env.APP_CONFIG.FILEPATH
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({ storage: storage })

export default upload