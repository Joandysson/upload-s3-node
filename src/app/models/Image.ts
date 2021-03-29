import { Env } from '@interfaces/IEnv'
import { params, verifyLabelType } from '@utils/rekognitionUtils'
import aws from 'aws-sdk'
import path from 'path'
import { promisify } from 'util'
import fs from 'fs'
import mongoose, { Schema } from 'mongoose'
import dotenv from 'dotenv'
import { IImage } from '@interfaces/IImage'
dotenv.config()

const { HOST, PORT, STORAGE_TYPE, BUCKET_NAME } = process.env as Env
const s3 = new aws.S3()

const ImageSchema: Schema = new Schema({
  id: String,
  name: String,
  type: String,
  filename: String,
  size: Number,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ImageSchema.pre('save', async function (this:IImage) {
  this.url = this.url || `${HOST}:${PORT}/files/${this.filename}`

  if (STORAGE_TYPE === 's3') {
    const labels = await detectImage(this.filename)
    if (!labels) return
    this.type = await verifyLabelType(labels)
  }
})

async function detectImage (filename: string): Promise<(string | undefined)[] | undefined> {
  const client = new aws.Rekognition()
  return await new Promise((resolve, reject) => {
    client.detectLabels(params(BUCKET_NAME, filename), (err, response) => {
      if (err) return reject(err)
      resolve(response.Labels?.map(label => label.Name))
    })
  })
}

ImageSchema.pre('remove', async function (this:IImage) {
  if (STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: this.filename
    }).promise()
  }

  return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.filename))
})

export default mongoose.model<IImage>('Image', ImageSchema)
