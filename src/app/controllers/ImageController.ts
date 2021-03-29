import { Request, Response, Express } from 'express'
import Image from '@models/Image'
import { renderImage, renderListImage } from '@views/image'

interface File extends Express.Multer.File {
  key: string,
  location: string
}

class ImageController {
  async index (_: Request, response: Response) {
    const images = await Image.find()
    return response.json(renderListImage(images))
  }

  async store (request: Request, response: Response) {
    const { originalname: name, size, key: filename, location: url = '' } = request.file as File

    const image = await Image.create({
      name,
      type: '',
      filename,
      size,
      url
    })

    return response.status(201).json(renderImage(image))
  }

  async delete (request: Request, response: Response) {
    const { id } = request.params

    const image = await Image.findById(id)

    if (!image) return response.status(404).json('image not found')

    await image.remove()

    response.send()
  }
}

export default new ImageController()
