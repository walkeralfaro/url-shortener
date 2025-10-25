
import FormLink from '@/components/form/FormLink'
import { Navbar } from '@/components/navigation/Navbar'
import { Hero } from '@/components/hero/Hero'

export default function App() {

  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <div className='bg-gray-100 mt-16'>
        <FormLink></FormLink>
      </div>
    </>
  )
}
