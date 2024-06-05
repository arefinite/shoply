import { z } from 'zod'

// * signup form schema
export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name has to be at least 3 characters long' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password has to be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password has to be same as password' }),
  })
  .refine(
    form => {
      return form.password === form.confirmPassword
    },
    {
      message: 'Password and confirm password are not matched',
      path: ['confirmPassword'],
    }
  )

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>


// * sign in from schema
export const signInFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password has to be at least 6 characters long' }),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>


// * add product from schema
export const addProductFormSchema = z.object({
  title: z.string().min(3, { message: 'Title has to be at least 3 characters long' }),
  brand: z.string().min(3, { message: 'Brand has to be at least 3 characters long' }),
  category: z.string().min(3, { message: 'Category has to be at least 3 characters long' }),
  description: z.string().min(3, { message: 'Description has to be at least 3 characters long' }),
  price: z.string().refine(value => {
    const priceValue = parseInt(value); // Parse string to integer
    return priceValue >= 1 && priceValue <= 5;
  }, { message: 'Price must be a number between 1 and 5' }),
  discount: z.string().refine(value => {
    const discountValue = parseInt(value); // Parse string to integer
    return discountValue >= 1 && discountValue <= 5;
  }, { message: 'Discount must be a number between 1 and 5' }),
  rating: z.string().refine(value => {
    const ratingValue = parseInt(value); // Parse string to integer
    return ratingValue >= 1 && ratingValue <= 5;
  }, { message: 'Rating must be a number between 1 and 5' }),
  image: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
}, 'Image is required'),
  
})

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>