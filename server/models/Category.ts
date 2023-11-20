import { Schema, model, InferSchemaType } from 'mongoose'

const CategorySchema = new Schema(
  {
    title: String,
    slug: String,
    image: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
)

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Product = InferSchemaType<typeof CategorySchema>
export const Category = model('Category', CategorySchema)
