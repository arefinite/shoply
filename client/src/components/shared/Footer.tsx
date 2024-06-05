const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-muted py-4 text-sm'>
      <section className='flex flex-col md:flex-row center items-center  justify-between'>
        <div>&copy; {year} by Arefinite | All Rights Reserved</div>
        <div>Design and Developed by Adnan Arefin</div>
      </section>
    </footer>
  )
}
export default Footer