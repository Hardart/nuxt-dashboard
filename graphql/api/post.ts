import { addProductQuery, updateProductQuery } from '~/graphql/typeDefs/query'

export default {
  async createProductMutation(input: IProduct) {
    const { mutate } = useMutation(addProductQuery)
    const response = await mutate({ input })
  },
  async updateProductMutation(input: object) {
    const { mutate } = useMutation(updateProductQuery)
    const response = await mutate({ input })
  },
}
