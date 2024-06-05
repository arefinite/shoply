import loader from '/loader.gif'
const Loader = () => {
  return (
    <div className="flex justify-center items-center">
        <img src={loader} alt="loading" className='h-12 w-12' />
    </div>
  )
}
export default Loader