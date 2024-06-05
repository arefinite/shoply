import { AddProductFormSchema } from '../validators/FormSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct, deleteProduct, updateProduct } from './api'

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AddProductFormSchema) => addProduct(data),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['products'] })
      }
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ['products'] })
      }
    },
  })
}

export const useUpdateProduct = (id:string,) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product:AddProductFormSchema) => updateProduct(id, product),
    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({queryKey:['products']})
      }
    }
  })
}