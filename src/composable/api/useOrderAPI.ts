import { axiosInstance } from '/@/composable/api/axios'
import { ref } from 'vue'
import { store } from '/@/store/store'

import PurchaseAddressType from '/@/types/PurchaseAddressType'
import PurchaseCreditType from '/@/types/PurchaseCreditType'
import ProductType from '/@/types/ProductType'
import UserType from '/@/types/UserType'
import OrderType from '/@/types/OrderType'

const webAPI = axiosInstance()

webAPI.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${store.state.user.accessToken}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export const apiCreateNewOrder = () => {
  const error = ref<string>('')
  const isLoading = ref(false)
  const order = ref(null)

  const load = async (
    user: UserType,
    purchaseInformation: PurchaseAddressType & PurchaseCreditType,
    cart: ProductType[]
  ) => {
    isLoading.value = true
    error.value = ''

    try {
      const totalPrice = cart.reduce((acc, current: ProductType) => {
        return current.price * current.count + acc
      }, 0)
      const today = new Date()
      const date = today.toISOString().slice(0, 10)

      const response = await webAPI.post('/order', {
        userId: user.id,
        purchaseInformation,
        cart,
        totalPrice, // not really sent to backend
        date, // not really sent to backend
      })

      if (response.data.error) {
        throw Error(response.data.error)
      }

      order.value = response.data
      isLoading.value = false
    } catch (e) {
      isLoading.value = false
      error.value = e.response.data || e.message
    }
  }
  return { order, error, load, isLoading }
}

export const apiGetOrder = () => {
  const error = ref<string>('')
  const isLoading = ref(false)
  const orderLists = ref<OrderType[]>([])

  const load = async () => {
    isLoading.value = true
    error.value = ''

    try {
      const response = await webAPI.get('/order')

      if (response.data.error) {
        throw Error(response.data.error)
      }

      orderLists.value = response.data
      isLoading.value = false
    } catch (e) {
      isLoading.value = false
      error.value = e.response.data || e.message
    }
  }
  return { orderLists, error, load, isLoading }
}
