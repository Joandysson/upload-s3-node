import { Document } from 'mongoose'

export interface IImage extends Document {
    id: string,
    name: string,
    type: string,
    filename: string,
    size: Number,
    url: string,
    createdAt: Date
  }
