export default defineEventHandler(async event => {
  return await Category.find()
})
