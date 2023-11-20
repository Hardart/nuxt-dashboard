import { Schema, model, InferSchemaType } from 'mongoose'

const ProductSchema = new Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    slug: String,
    price: Number,
    type: String,
    features: {
      height: { min: Number, max: Number },
      class: Number,
      price: Number,
      weight: Number,
    },
    image: String,
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.category = ret.categoryId
    delete ret.categoryId
    delete ret._id
    delete ret.__v
  },
})

export type Product = InferSchemaType<typeof ProductSchema>
export const Product = model('Product', ProductSchema)
