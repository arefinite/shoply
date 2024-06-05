import { useGetAllProducts } from '@/services/queries'
import SitePath from '@/components/shared/SitePath'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDeleteProduct } from '@/services/mutations'
import { useState } from 'react'
import { toast } from 'sonner'

const ManageProducts = () => {
  const [deleteProductId, setDeleteProductId] = useState<string>('')
  const { data: products, isPending, isError, error } = useGetAllProducts()
  const { mutateAsync: deleteProductAsync } = useDeleteProduct()

  const handleDeleteProduct = async(id: string) => {
    await deleteProductAsync(id)
      toast('Product deleted successfully')
    
  }
  

  return (
    <main className='flex flex-col gap-8 my-8 w-full'>
      <SitePath items={false} currentPage='Manage Products' />
      <Button className='w-fit' asChild>
        <Link to='/dashboard/manage-products/add-product'>Add Product</Link>
      </Button>
      <h1 className='text-xl font-bold'>List of Products</h1>

      {isPending && <LoaderCircle className='animate-spin' />}
      {isError && (
        <div className='p-4 bg-red-100 text-red-500 rounded-lg'>
          {error?.message}
        </div>
      )}
      {products && Array.isArray(products) && (
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <TableCell className='font-medium'>{product.title}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className='text-right space-x-2'>
                  <Button variant='secondary' asChild>
                    <Link to={`/dashboard/manage-products/update-product/${product._id}`}>
                      Update
                    </Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className='inline-block'>
                        <Button variant='destructive' onClick={() => setDeleteProductId(product._id)}>
                          Delete
                        </Button>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the product from our server.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteProductId('')}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProduct(deleteProductId)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  )
}

export default ManageProducts
