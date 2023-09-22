import React, { useEffect, useState } from "react";

const Timeline = () => {
    const numOfEvents: number = 7

    return (
        <div className='m-5'>
            <BodyLine />
            <EventBox />
        </div>
    )
}

export default Timeline

const BodyLine = () => {
    return (
        <div className={`w-3 h-5 relative`}>
            <div className={`absolute w-0.5 h-[894px] bg-gray-400 left-1/2 `} style={{transform:'translate(-50%,-0)'}}></div>
            <div className={`absolute w-0.5 h-[854px] bg-gray-600 left-1/2 top-5`} style={{transform:'translate(-50%,-0)'}}></div>
        </div>
    )
}

const EventBox = () => {
    return (
        <div className='flex'>
            <EventNode />
            <div className="w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md">
            </div>
        </div>
    )
}

const EventNode = () => {
    return (
        <div className='w-3 mr-2.5 z-10'>
            <div className='w-3 h-3 bg-white mr-2.5 border-2 rounded-full border-gray-600'></div>
        </div>
    )
}