import express from 'express';

const router = express.Router();
import passport from 'passport';
import fileUploader from 'config/fileUPloader';
import { fileValidators } from 'middlewares/index'
import { uploadImage } from './controller'

const uploadMiddlewares = [
    passport.authenticate("jwt", { session: false }),
    fileUploader.single("img"),
    fileValidators.isFile,
    fileValidators.isFileErrorHandler
]

router.post('/uploadImage',uploadMiddlewares, uploadImage);
export default router