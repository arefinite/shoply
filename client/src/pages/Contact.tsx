import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import contact from '/contact.svg'

const Contact = () => {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] pt-8'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Contact Us</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email and message to contact with us
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' required />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Textarea placeholder='Type your message here' rows={10} />
              </div>
            </div>
            <Button type='submit' className='w-full'>
              Send Message
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
          </div>
        </div>
      </div>
      <div className='w-1/2 justify-center hidden md:flex'>
        <img src={contact} alt='contact' />
      </div>
    </div>
  )
}

export default Contact
