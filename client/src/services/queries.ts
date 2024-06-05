import { useQuery } from "@tanstack/react-query"
import { getAllProducts, getSingleProduct, getUser } from "./api"


export const useGetAllProducts = () => {
  return useQuery(
    {
      queryKey: ['products'],
      queryFn: getAllProducts
    }
  )
}

export const useGetSingleProduct = (id:string) => {
  return useQuery(
    {
      queryKey: ['products', id],
      queryFn: ()=> getSingleProduct(id)
    }
  )
}

export const useGetUser = () => {
  return useQuery(
    {
      queryKey: ['user'],
      queryFn: ()=> getUser()
    }
  )
}

