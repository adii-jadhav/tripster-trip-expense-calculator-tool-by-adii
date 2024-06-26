import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <div className='w-screen h-screen p-3 md:flex justify-center items-center'>
            <div className='md:w-[40%]'>
                <img src='calculator.png' className='w-full h-full object-contain' alt="" />
            </div>
            <div className="md:w-1/2 p-2 my-2">
                <p className="md:text-5xl text-3xl my-5 font-bold md:w-2/3">Trip contro calculations made easy with <span className='text-orange-500'>Tripster</span> </p>
                <p className="text-gray-700 font-semibold md:text-xl text-lg my-3">Tripster is a tool that make your trip calculations </p>

                <p className="text-gray-700 font-semibold md:text-xl text-lg my-3">calculate the trip expense and share the same with your friends </p>
                <Link to={'/create-trip-expense'}>
                    <div className='w-fit p-2 px-3 rounded-2xl bg-orange-500 shadow-xl cursor-pointer'>
                        <p className="font-bold text-white">CREATE TRIP EXPENSE</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
