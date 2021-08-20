import request from '@/utils/request'

export function addProductCategoryApi(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function getProductCategoryApi(params) {
  return request({
    url: '/categories',
    method: 'get',
    params
  })
}

export function updateProductCategoryApi(data, id) {
  return request({
    url: `/categories/${id}`,
    method: 'patch',
    data
  })
}

export function deleteProductCategoryApi(id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  })
}

export function getProductItemApi(params) {
  return request({
    url: '/product',
    method: 'get',
    params
  })
}

export function deleteProductItemApi(id) {
  return request({
    url: `/product/${id}`,
    method: 'delete'
  })
}

export function addProductItemApi(data) {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('price', data.price)
  formData.append('categoryId', data.categoryId)
  formData.append('description', data.description)
  formData.append('image', data.image)
  return request({
    url: '/product',
    method: 'post',
    data: formData
  })
}

export function updateProductItemApi(data, id) {
  const formData = new FormData()

  for (const key in data) {
    formData.append(key, data[key])
  }

  return request({
    url: `/product/${id}`,
    method: 'patch',
    data: formData
  })
}
