import SitePath from '@/components/shared/SitePath'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Link } from 'react-router-dom'

const ManageProducts = () => {
  return (
    <main className='flex flex-col gap-8 my-8 w-full'>
      <SitePath items={false}  currentPage='Manage Products' />
      <Button className='w-fit' asChild>
        <Link to='/dashboard/manage-products/add-product'>Add Product</Link>
      </Button>
      <h1 className='text-xl font-bold'>List of Products</h1>

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
          <TableRow>
            <TableCell className='font-medium'>a</TableCell>
            <TableCell>a</TableCell>

            <TableCell>a</TableCell>
            <TableCell>a</TableCell>

            <TableCell className='text-right space-x-2'>
              <Button variant='secondary'>
                <Link to={`/dashboard/update-product/`}>Update</Link>
              </Button>
              <Button variant='destructive'>Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  )
}
export default ManageProducts
