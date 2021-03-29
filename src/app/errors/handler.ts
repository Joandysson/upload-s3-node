import { ErrorRequestHandler } from 'express'
import { MulterError } from 'multer'

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof MulterError) {
    return res.status(500).json({ error: error.field })
  }

  return res.status(500).json({ info: 'Internal server error', error: error.message })
}

export default errorHandler
