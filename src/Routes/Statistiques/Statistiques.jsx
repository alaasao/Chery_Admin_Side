import React from 'react'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import ModeleCart from './components/ModeleCart'
import { useState,useEffect } from 'react'
import axios from 'axios'
export const Statistiques = () => {
  return (
    <div className='one-class h-[100vh] bg-white'>
      <div className='w-[90%] h-[80%]   flex flex-col md:flex-row       xl:grid xl:grid-cols-3  items-center mx-6'>
        <div className='flex flex-row w-[80%] mb-10 justify-between'>
            <div className='cont  flex items-center justify-center  flex-col m-4  '>
                <p className='text-2xl text-red-500 text-center font-bold mb-10'>Analyse des ventes</p>
                <LineChart />
              </div>

              <div className='shadow-2xl bg-white  flex items-center justify-center gap-6 flex-col  m-4 shadow-black '>
              <p className='text-2xl text-center font-bold mb-10'>Analyse des revenues</p>
                <LineChart />
          </div>
        </div>
          <div className='shadow-2xl bg-white h-[500px] flex items-center justify-center gap-6  flex-col  shadow-black '>
            <p className='text-2xl text-center font-bold mb-10'>Analyse des ventes</p>
            <BarChart/>
          </div>

      </div>
        <div className='cont  bg-white h-[1000px] flex items-center justify-center gap-6  flex-col  shadow-black '>
            <p className='text-2xl text-center font-bold haa'>Analyse des ventes Par Modele</p>
            <ModeleCart/>
        </div>
    </div>
  )
}
