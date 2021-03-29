import { IImage } from '@interfaces/IImage'

export function renderImage (image: IImage) : IImage {
  const { _id, name, type, filename, size, url, createdAt } = image

  return {
    id: _id,
    name,
    type,
    filename,
    size,
    url,
    createdAt
  } as IImage
}

export function renderListImage (image: IImage[]) : IImage[] {
  return image.map(image => renderImage(image))
}
