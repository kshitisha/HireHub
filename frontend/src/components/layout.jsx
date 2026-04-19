import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout