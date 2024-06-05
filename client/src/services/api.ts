import { AddProductFormSchema } from '@/validators/FormSchema';
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL
})

export const addProduct = async (data: AddProductFormSchema) => {
  return await apiClient.post(`${baseURL}/product`, data)
}

export const getAllProducts = async () => {
  return (await apiClient.get<AddProductFormSchema>(`${baseURL}/product/all-products`)).data
}

export const deleteProduct = async (id: string) => {
  return await apiClient.delete(`${baseURL}/product/${id}`)
}