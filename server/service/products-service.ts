import { Types } from 'mongoose'
import { Product } from '../models/Product'
import { Category } from '../models/Category'
import categoryService from './category-service'

class ProductService {
  async getAll({ filter, sort, limit, page }: IFilterQueryParams) {
    const products = await Product.find({ $and: filter })
      .select(['title', 'createdAt', 'updatedAt', 'isPublished'])
      .sort(sort)
      .limit(limit)
      .skip(page * limit)
    return products
  }

  async getCount(filter: FilterQuery = [{}]) {
    return await Product.find({ $and: filter }).countDocuments()
  }

  async insertOne(product: Product) {
    const newProduct = await Product.findOneAndUpdate({ categoryId: product.categoryId, slug: product.slug }, product, {
      upsert: true,
      new: true,
    }).populate('categoryId', ['-products', '-createdAt', '-updatedAt'])
    await Category.updateOne({ _id: product.categoryId }, { $addToSet: { products: newProduct.id } })
    return newProduct
  }

  async findByID(id: string) {
    return await Product.findById(id).populate('categoryId', ['-products', '-createdAt', '-updatedAt'])
  }

  async filterBy({ title, categoryId }: { title: string; categoryId: string }, page: number = 0, limit: number = 0) {
    if (categoryId) return await categoryService.findProductsByFilter({ title, categoryId }, page, limit)

    return await Product.find()
      .or([{ title: new RegExp(title, 'i') }])
      .populate('categoryId', ['title', 'slug'])
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: 'desc' })
  }

  async deleteOne(id: string) {
    const product = await Product.findByIdAndDelete(id)
    if (product) await Category.findByIdAndUpdate(product.categoryId, { $pull: { products: new Types.ObjectId(id) } })
    return product
  }
}

export default new ProductService()
