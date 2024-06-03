import React from 'react'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import ModeleCart from './components/ModeleCart'
import { useState,useEffect } from 'react'
import axios from 'axios'
export const Statistiques = () => {
  return (
    <div className='one-class h-[100vh] w-[90%] flex items-center flex-col justify-center'>
      <div className='ha  justify-around w-[90%]  flex flex-wrap  xl:grid xl:grid-cols-3  items-center mx-6'>
          <div className='cont flex items-center justify-center  flex-col  '>
                  <p className='text-2xl text-red-500 text-center font-bold mb-10'>Analyse des ventes</p>
                  <LineChart />
          </div>
          <div className='cont flex items-center justify-center  flex-col '>
                <p className='text-2xl text-center font-bold mb-10'>Analyse des revenues</p>
                  <LineChart />
          </div>
          
          <div className='cont flex items-center justify-center gap-6  flex-col '>
              <p className='text-2xl text-center font-bold mb-10'>Analyse des ventes</p>
              <BarChart/>
          </div>

      </div>
      <div className='ba  flex items-center justify-center   flex-col '>
            <p className='text-2xl text-center font-bold haa'>Analyse des ventes Par Modele</p>
            <ModeleCart/>
      </div>
    </div>
  )
}
