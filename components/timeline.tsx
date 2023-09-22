import React, { useEffect, useState } from "react";

const Timeline = () => {
    return (
        <div className='m-5 relative'>
            <BodyLine />
            <EventBox />
        </div>
    )
}

export default Timeline

const BodyLine = () => {
    return (
        <>
            <canvas className="absolute"/>
        </>
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
        <div>

        </div>
    )
}