import { Schema, model, InferSchemaType } from 'mongoose'

const TestimonialSchema = new Schema(
  {
    name: String,
    text: String,
    image: String,
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
)

TestimonialSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Product = InferSchemaType<typeof TestimonialSchema>
export const Testimonial = model('Testimonial', TestimonialSchema)
