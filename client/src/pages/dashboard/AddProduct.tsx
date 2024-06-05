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
import { useAddProduct } from '@/api/mutations'
import { LoaderCircle } from 'lucide-react'

const AddProduct = () => {
  const form = useForm<AddProductFormSchema>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: '',
      brand: '',
      category: '',
      price: '',
      discount: '',
      rating: '',
      description: '',
    },
  })
  const imgRef = form.register('image')
  const { mutate: addProduct, isPending } = useAddProduct()

  const onSubmit: SubmitHandler<AddProductFormSchema> = data => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('brand', data.brand)
    formData.append('category', data.category)
    formData.append('description', data.description)
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0] as File)
    }
    formData.append('price', data.price)
    formData.append('discount', data.discount)
    formData.append('rating', data.rating)
   
    console.log(formData)

    // @ts-expect-error ( something is wrong with the type of the data.image)
    addProduct(formData)
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
              currentPage='Add Product'
            />
            <div className='items-center gap-4 hidden md:flex'>
              <Button variant={'outline'}>
                <span className='ml-2'>Cancel</span>
              </Button>

              <Button type='submit' disabled={isPending}>
                {isPending && <LoaderCircle className='animate-spin' />}

                <span className='ml-2'>
                  {isPending ? 'Adding Product' : 'Add Product'}
                </span>
              </Button>
            </div>
          </div>
          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>Add a new Product</CardTitle>
              <CardDescription>
                Fill out the form below to add a new product.
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
                        <Textarea
                          rows={5}
                          placeholder='Tell us a little bit about yourself'
                          className='resize-none'
                          {...field}
                        />
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
                  <span className='ml-2'>Cancel</span>
                </Button>

                <Button type='submit' disabled={isPending}>
                  {isPending && <LoaderCircle className='animate-spin' />}

                  <span className='ml-2'>
                    {isPending ? 'Adding Product' : 'Add Product'}
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

export default AddProduct
