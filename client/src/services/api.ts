import { Product } from '@/types/product'
import { User } from '@/types/user'
import { AddProductFormSchema } from '@/validators/FormSchema'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL,
})

const token = localStorage.getItem('access-token')

export const addProduct = async (data: AddProductFormSchema) => {
  return await axios.post(`${baseURL}/product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllProducts = async () => {
  return (await apiClient.get<Product[]>(`${baseURL}/product/all-products`))
    .data
}

export const deleteProduct = async (id: string) => {
  return await apiClient.delete(`${baseURL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getSingleProduct = async (id: string) => {
  return (await apiClient.get<Product>(`${baseURL}/product/${id}`)).data
}

export const updateProduct = async (id: string, data: AddProductFormSchema) => {
  return await apiClient.patch(`${baseURL}/product/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const signUp = async (data: User) => {
  return await apiClient.post(`${baseURL}/auth/sign-up`, data)
}

export const signIn = async (data: User) => {
  return await apiClient.post(`${baseURL}/auth/sign-in`, data)
}

export const signOut = async () => {
  return await apiClient.post(`${baseURL}/auth/sign-out`)
}

export const getUser = async()=> {
  return (await apiClient.get(`${baseURL}/user`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
