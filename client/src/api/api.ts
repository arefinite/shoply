import { AddProductFormSchema } from '@/validators/FormSchema';
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL
})

export const addProduct = async (data: AddProductFormSchema) => {
  return await apiClient.post(`${baseURL}/product`, data)
}