// import faq from '/faq.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
const Faq = () => {
  return (
    <section className='py-8 center'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-bold'>Frequently Asked Question</h2>
      </div>
      <div className='flex flex-col gap-4 md:flex-row justify-between py-10'>
        <div className='flex-1 items-center flex justify-center'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Can I order online?</AccordionTrigger>
              <AccordionContent>
                No, not right now, we are trying to update our website so that you can order line.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Can I go to store for purchasing?</AccordionTrigger>
              <AccordionContent>
                Yes, we have physical store. You can visit and buy from us.
                
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>Is your product authentic?</AccordionTrigger>
              <AccordionContent>
               Yes, all the product we are importing is 100% authentic.You can rely on us.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
        {/* <div className='flex-1'>
          <img src={faq} alt='faq' />
        </div> */}
      </div>
    </section>
  )
}
export default Faq
