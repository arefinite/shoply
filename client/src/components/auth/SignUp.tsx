import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { useSignUp } from '@/services/mutations'
import { User } from '@/types/user'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const SignUp = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm()
  const { mutateAsync: createUser, isPending } = useSignUp()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const userData: User = data as User
      await createUser(userData).then(response =>
        localStorage.setItem('access-token', response.data.token)
      )
      toast('Sign up successful')
      navigate('/')
      setIsLoggedIn(true)
    } catch (error) {
      if (error instanceof AxiosError) toast(error.response?.data.message)
    }
  }

  return (
    <main>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <div className='flex items-center justify-center [&>div]:w-full'>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='flex flex-col p-6 space-y-1'>
              <h3 className='font-semibold tracking-tight text-2xl'>
                Create an account
              </h3>
              <p className='text-sm text-muted-foreground'>
                Enter your credentials below to create your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='p-6 pt-0 grid gap-4'>
                <div className='grid gap-2'>
                  <label
                    htmlFor='fullName'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Full Name
                  </label>
                  <input
                    {...register('fullName')}
                    id='fullName'
                    required
                    type='text'
                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className='grid gap-2'>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Email
                  </label>
                  <input
                    {...register('email')}
                    id='email'
                    type='email'
                    required
                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
                <div className='grid gap-2'>
                  <label
                    htmlFor='password'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Password
                  </label>
                  <input
                    {...register('password')}
                    id='password'
                    type='password'
                    required
                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>

              <div className='flex items-center p-6 pt-0'>
                <button
                  role='submit'
                  disabled={isPending}
                  className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full'
                >
                  {isPending ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp
