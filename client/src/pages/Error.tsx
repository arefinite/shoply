import { Button } from '@/components/ui/button'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className='grid min-h-screen place-items-center'>
        <div className='text-center space-y-4'>
          <h1 className='text-xl'>404 | Page Not Found</h1>
          <Button asChild>
            <Link to='/'>Go Back Home</Link>
          </Button>
        </div>
      </main>
    )
  }
  return (
    <main className='grid min-h-screen place-items-center'>
      <div className='text-center space-y-4'>
        <h1 className='text-xl'>Something Went Wrong!</h1>
        <Button asChild>
          <Link to='/'>Go Back Home</Link>
        </Button>
      </div>
    </main>
  )
}
export default Error