import { auth } from '@/firebase/firebase.config'
import { useSignIn, useSignUp } from '@/services/mutations'
import { User } from '@/types/user'
import { AxiosError } from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const { register, handleSubmit } = useForm()
  const { mutateAsync: signInUser, isPending } = useSignIn()
  const { mutateAsync: signUp } = useSignUp()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const userData: User = data as User
      await signInUser(userData)
      toast('Sign in successful')
    } catch (error) {
      if (error instanceof AxiosError) toast(error.response?.data.message)
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      const userData = {
        email: data?.user.email,
        fullName: data?.user.displayName,
      }
      console.log(userData)
      if (userData.email && userData.fullName) {
        //@ts-expect-error (something need to fix with the type)
        signUp(userData)
          .then(response => {
            localStorage.setItem('access-token', response.data.token)
          })
          .catch(error => {
            console.error('Error signing up:', error)
          })
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <main>
      <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
        <div className='flex items-center justify-center [&>div]:w-full'>
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='flex flex-col p-6 space-y-1'>
              <h3 className='font-semibold tracking-tight text-2xl'>
                Sign In your account
              </h3>
              <p className='text-sm text-muted-foreground'>
                Enter your credentials below or use social platform
              </p>
            </div>
            <div className='p-6 pt-0 grid gap-4'>
              <button
                onClick={handleGoogleSignIn}
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2'
              >
                <svg role='img' viewBox='0 0 24 24' className='mr-2 h-4 w-4'>
                  <path
                    fill='currentColor'
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  />
                </svg>
                Google
              </button>

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
                  <label
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                    id='email'
                    placeholder='demo@example.com'
                    type='email'
                    {...register('email')}
                    required
                  />
                </div>
                <div className='grid gap-2 mt-4'>
                  <label
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <input
                    className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                    id='password'
                    type='password'
                    {...register('password')}
                    required
                  />
                </div>

                <div className='flex items-center mt-4 pt-0'>
                  <button
                    role='submit'
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full'
                  >
                    {isPending ? 'Logging...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default SignIn
