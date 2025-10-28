
import { Navbar } from '@/components/navigation/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FormLink } from '@/components/form/FormLink'
import { Features } from '@/components/features/Features'
import { Action } from '@/components/footer/Action'
import { Footer } from '@/components/footer/Footer'

export default function App() {

  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <div className='bg-slate-100 mt-10'>
        <FormLink></FormLink>
        <Features></Features>
      </div>
      <Action></Action>
      <Footer></Footer>
    </>
  )
}
