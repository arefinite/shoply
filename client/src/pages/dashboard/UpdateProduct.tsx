import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import SitePath from '@/components/shared/SitePath'
import { Textarea } from '@/components/ui/textarea'
import {
  addProductFormSchema,
  AddProductFormSchema,
} from '@/validators/FormSchema'
import { LoaderCircle } from 'lucide-react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useUpdateProduct } from '@/services/mutations'
import { toast } from 'sonner'

const UpdateProduct = () => {
  const product = useLoaderData() as AddProductFormSchema
  const { id } = useParams()
  const {
    mutateAsync: updateProductAsync,
    isPending,

  } = useUpdateProduct(id!)
  const navigate = useNavigate()
  const form = useForm<AddProductFormSchema>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: product?.title,
      brand: product?.brand,
      category: product?.category,
      price: product?.price.toString(),
      discount: product?.discount.toString(),
      rating: product?.rating.toString(),
      description: product?.description,
    },
  })
  const imgRef = form.register('image')

  const onSubmit: SubmitHandler<AddProductFormSchema> = async data => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('brand', data.brand)
    formData.append('category', data.category)
    formData.append('description', data.description)
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0] as File)
    } else {
      // @ts-expect-error (something is wrong with the type of the data.image)
      formData.append('existingImage', product.image)
    }
    formData.append('price', data.price)
    formData.append('discount', data.discount)
    formData.append('rating', data.rating)

    // @ts-expect-error ( something is wrong with the type of the data.image)
    await updateProductAsync(formData)

    toast('Product Updated Successfully')

    navigate('/dashboard/manage-products')
  }

  return (
    <section className='mt-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <SitePath
              items={true}
              prevLink='/dashboard/manage-products'
              prevName='Manage Product'
              currentPage='Update Product'
            />
            <div className='items-center gap-4 hidden md:flex'>
              <Button variant={'outline'} asChild>
                <span className='ml-2'>
                  <Link to='/dashboard/manage-products'>Go Back</Link>
                </span>
              </Button>

              <Button type='submit' disabled={isPending}>
                {isPending && <LoaderCircle className='animate-spin' />}

                <span className='ml-2'>
                  {isPending ? 'Updating Product' : 'Update Product'}
                </span>
              </Button>
            </div>
          </div>
          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>Update Product</CardTitle>
              <CardDescription>
                Fill out the form below to update product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='image'
                  render={() => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type='file' className='w-full' {...imgRef} />
                      </FormControl>
                      {product.image && (
                        <img
                          // @ts-expect-error (image file type is not defined)
                          src={product.image}
                          alt='Current product'
                          className='mt-2 h-32'
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input type='text' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={5} className='resize-none' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex items-center gap-4 md:hidden'>
                <Button variant={'outline'}>
                  <span className='ml-2'>Go Back</span>
                </Button>

                <Button type='submit' disabled={isPending}>
                  {isPending && <LoaderCircle className='animate-spin' />}

                  <span className='ml-2'>
                    {isPending ? 'Updating Product' : 'Update Product'}
                  </span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  )
}

export default UpdateProduct
