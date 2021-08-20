import { axiosInstance } from '/@/composable/api/axios'
import { ref } from 'vue'

import ProductType from '/@/types/ProductType'
import CategoryType from '/@/types/CategoryType'

const webAPI = axiosInstance()

export const getProducts = () => {
  const products = ref<ProductType[]>([])
  const error = ref<string>('')
  const count = ref<number>(0)

  const load = async (queryParams: {
    _sort?:
      | 'id'
      | 'title'
      | 'price'
      | 'description'
      | 'category'
      | 'image'
      | 'sales'
    _id?: string
    _order?: 'asc' | 'desc'
    _limit?: number
    _page?: number
    category?: string
  }) => {
    try {
      products.value = []

      if (queryParams.category === '') {
        delete queryParams.category
      }

      const response = await webAPI.get('/product', { params: queryParams })
      count.value = +response.headers['x-total-count']

      if (response.data.error) {
        throw Error(response.data.error)
      }
      products.value = response.data
    } catch (e) {
      error.value = e.response.data || e.message
    }
  }
  return { products, error, load, count }
}

export const getCategories = () => {
  const categories = ref<CategoryType[]>([])
  const error = ref<string>('')
  const load = async () => {
    try {
      const data = (await webAPI.get('/categories')).data
      if (data.error) {
        throw Error(data.error)
      }
      categories.value = [...data]
    } catch (e) {
      error.value = e.response.data || e.message
    }
  }
  return { categories, error, load }
}
