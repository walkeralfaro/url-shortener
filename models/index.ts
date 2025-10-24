import mongoose, { Schema, Document } from "mongoose"

export interface ILinkModel extends Document {
  shortUrl: string
  url: string
}

const LinkSchema = new Schema<ILinkModel>({
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
}, { timestamps: true })

const LinkModel = mongoose.models.Link || mongoose.model<ILinkModel>("Link", LinkSchema)

export default LinkModel

