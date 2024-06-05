import { AddProductFormSchema } from './../validators/FormSchema';
import { useMutation } from "@tanstack/react-query"
import { addProduct } from "./api"


export const useAddProduct = () => {
  return useMutation({
    mutationFn: (data:AddProductFormSchema)=> addProduct(data)
  })
}