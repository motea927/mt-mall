import { axiosInstance } from '/@/composable/api/axios'
import { ref } from 'vue'

const webAPI = axiosInstance()

export const getProducts = (queryParams: {
  _sort?:
    | 'id'
    | 'title'
    | 'price'
    | 'description'
    | 'category'
    | 'image'
    | 'sales'
  id?: string
  _order?: 'asc' | 'desc'
  _limit?: number
}) => {
  const products = ref([])
  const error = ref(null)
  const load = async () => {
    try {
      let data = (await webAPI.get('/products', { params: queryParams })).data
      if (data.error) {
        throw Error(data.error)
      }
      products.value = data
    } catch (e) {
      error.value = e.message
    }
  }
  return { products, error, load }
}
