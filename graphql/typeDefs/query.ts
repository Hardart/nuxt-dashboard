export const getProducts = gql`
  query getProducts {
    products {
      title
      slug
      category {
        title
        slug
      }
    }
  }
`
export const getProductBySlug = gql`
  query getProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      title
      subtitle
      description
      price
      image
      type
      slug
      features {
        class
        price
        weight
        height {
          min
          max
        }
      }
      category {
        title
        id
        slug
      }
    }
  }
`
export const getCategoryBySlug = gql`
  query category($slug: String!) {
    categoryBySlug(slug: $slug) {
      title
      slug
      products {
        title
        slug
      }
    }
  }
`
export const getMeta = gql`
  query getMeta {
    categories {
      title
      slug
      products {
        title
        slug
      }
    }
  }
`
export const getCategoriesWithProductsQuery = gql`
  query getMeta {
    categories {
      title
      slug
      products {
        title
        slug
      }
    }
  }
`
export const addProductQuery = gql`
  mutation addProduct($input: CreateProductInput) {
    createProduct(input: $input) {
      title
      id
    }
  }
`
export const updateProductQuery = gql`
  mutation updateProduct($updateProductId: String, $input: UpdateProductInput) {
    updateProduct(id: $updateProductId, input: $input) {
      title
    }
  }
`

export const getCategories = gql`
  query getCategories {
    categories {
      id
      title
      slug
    }
  }
`
