import { Types } from 'mongoose'
import { Category } from '../models/Category'

const aggregate = () => ({
  $lookup: {
    from: 'products',
    localField: 'products',
    foreignField: '_id',
    as: 'products',
  },
  $project: { title: 1, slug: 1, products: { title: 1, createdAt: 0, updatedAt: 0, slug: 1 } },
  $unwind: '$category',
  $matchById(id: string) {
    return { _id: new Types.ObjectId(id) }
  },
  $addFields: { id: '$_id', 'products.id': '$products._id' },
})

class CategoryService {
  async getAll() {
    return await Category.find().select(['title', 'slug', 'createdAt', 'updatedAt', 'isPublished'])
  }

  async findById(id: string) {
    const { $project, $lookup, $matchById } = aggregate()
    return await Category.aggregate([{ $match: $matchById(id) }, { $lookup }, { $project: { ...$project, _id: 0 } }])
  }

  async findBySlug(slug: string) {
    return await Category.findOne({ slug }).select(['title', 'slug']).populate('products', ['title', 'slug'])
  }

  async filterBy(filterArgs: object) {
    const { $lookup } = aggregate()
    if ('_id' in filterArgs && typeof filterArgs._id === 'string') filterArgs._id = new Types.ObjectId(filterArgs._id)
    return (
      await Category.aggregate([
        { $lookup },
        { $match: filterArgs },
        { $project: { _id: 0, title: 1, slug: 1, products: { title: 1, slug: 1 } } },
      ])
    )[0]
  }

  async findProductsByFilter({ title, categoryId }: { title: string; categoryId: string }, page: number = 0, limit: number = 0) {
    return (
      await Category.findById(categoryId).populate({
        path: 'products',
        match: { title: new RegExp(title, 'i') },
        populate: { path: 'categoryId', select: ['title', 'slug'] },
        options: {
          limit,
          skip: (page - 1) * limit,
          sort: { createdAt: 'desc' },
        },
      })
    )?.products
  }
}

export default new CategoryService()
