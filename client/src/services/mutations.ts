import { AddProductFormSchema } from '../validators/FormSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct, deleteProduct, signIn, signOut, signUp, updateProduct } from './api'
import { User } from '@/types/user'

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

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data:User)=>signUp(data)
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data:User)=>signIn(data)
  })
}

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut
  })
}