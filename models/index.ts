import mongoose, { Schema, model, models } from "mongoose"

export interface ILinkModel extends Document {
  shortUrl: string
  url: string
}

export const LinkModelSchema = new Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
}, { timestamps: true });

const LinkModel = models.LinkModel || mongoose.model<ILinkModel>("Link", LinkModelSchema)

export default LinkModel
