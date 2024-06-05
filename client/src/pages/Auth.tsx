import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock } from 'lucide-react'

const Auth = () => {
  return (
    <main className='center md:flex md:justify-center md:items-center pt-16'>
      <section>
        <div className='flex justify-center'>
          <div className='flex gap-2 items-center pb-8 font-bold'>
            <Lock color='red' size={30} />
            <span className='text-3xl'>
              Admin <span className='text-red-500'>Area</span>
            </span>
          </div>
        </div>
        <Tabs defaultValue='signIn' className='w-full md:w-[400]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='signIn'>SignIn</TabsTrigger>
            <TabsTrigger value='signUp'>SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value='signIn'>
            <SignIn />
          </TabsContent>
          <TabsContent value='signUp'>
            <SignUp />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default Auth
