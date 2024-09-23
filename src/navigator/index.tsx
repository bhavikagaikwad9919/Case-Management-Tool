import React, { useState, useEffect } from 'react'
import TopHeader from '../Component/TopHeader'
import Routing from './Routing'
import TopNavBar from '../Component/TopNavBar'
import Footer from '../Component/Footer'
import EditScreenTabcomponent from '../Component/EditScreenTabcomponent'


export const Index = () => {

  return (
    <>
    <div>
      <main>
        <TopHeader />
        <Routing />
      </main>
      
    </div>
    <div className='pb-40'>
    <Footer />
  </div>
  </>
  )
}

export default Index

