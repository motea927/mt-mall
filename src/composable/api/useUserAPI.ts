import { axiosInstance } from '/@/composable/api/axios'
import { ref } from 'vue'

import UserType from '/@/types/UserType'

const webAPI = axiosInstance()

export const apiLogin = () => {
  const user = ref<null | UserType>(null)
  const error = ref<string>('')
  const isLoading = ref(false)

  const load = async (queryParams: { email: string; password: string }) => {
    isLoading.value = true

    try {
      user.value = null
      let response

      if (import.meta.env.MODE === 'development') {
        response = await webAPI.get('/users/login', {
          params: { ...queryParams },
        })
      } else {
        response = await webAPI.post('/users/login', queryParams)
      }

      if (response.data.error) {
        throw Error(response.data.error)
      }

      if (import.meta.env.MODE === 'development') {
        response.data = response.data[0]

        response.data.accessToken = response.data.id
      }

      user.value = response.data
      isLoading.value = false
    } catch (e) {
      isLoading.value = false
      error.value = e.response.data || e.message
    }
  }
  return { user, error, load, isLoading }
}

export const apiSignup = () => {
  const user = ref<null | UserType>(null)
  const error = ref<string>('')
  const isLoading = ref(false)

  const load = async (queryParams: {
    name: string
    email: string
    password: string
  }) => {
    isLoading.value = true

    try {
      user.value = null

      const response = await webAPI.post('/users', queryParams)

      if (response.data.error) {
        throw Error(response.data.error)
      }

      if (import.meta.env.MODE === 'development') {
        response.data.accessToken = response.data.id
      }

      user.value = response.data
      isLoading.value = false
    } catch (e) {
      isLoading.value = false
      error.value = e.response.data || e.message
    }
  }
  return { user, error, load, isLoading }
}
