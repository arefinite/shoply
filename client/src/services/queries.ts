import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "./api"


export const useGetAllProducts = () => {
  return useQuery(
    {
      queryKey: ['products'],
      queryFn: getAllProducts
    }
  )
}

