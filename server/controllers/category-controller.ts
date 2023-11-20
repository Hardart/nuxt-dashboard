import categoryService from '../service/category-service'
import { Response, Request } from 'express'

class CategoryController {
  async getAll(req: Request, res: Response) {
    const categories = await categoryService.getAll()
    return res.json(categories)
  }
  async findById(req: Request, res: Response) {
    const { id } = req.body
    const category = await categoryService.findById(id)
    return res.json(category)
  }
  async findBySlug(req: Request, res: Response) {
    const { slug } = req.body
    const category = await categoryService.findBySlug(slug)
    return res.json(category)
  }
  async filterBy(req: Request, res: Response) {
    const { filter } = req.body

    const category = await categoryService.filterBy(filter)
    return res.json(category)
  }
}

export default new CategoryController()
