import { useState } from 'react'
import Navbar from '../components/Navbar'
import Ads from '../components/Ads'
import Sidebar from '../components/Sidebar'
import GameDisplay from '../components/GameDisplay'
import Populargame from '../components/Populargame'
import Footer from '../components/Footer'
import Store from '../components/Store'


function Homepage() {

  return (
    <>
     {/* <Navbar/> */}
     <Ads/>
     <div className='flex'>
     <Sidebar/>
     <div>
     {/* <GameDisplay/> */}
     {/* <Populargame/> */}
     <Store/>
     </div>
     </div>
     <Footer/>
    </>
  )
}

export default Homepage
