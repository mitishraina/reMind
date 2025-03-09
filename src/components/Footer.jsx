import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-center items-center w-full text-lg'>
            <span className='flex items-center'>Created with <lord-icon
                src="https://cdn.lordicon.com/ulnswmkk.json"
                trigger="loop"
                delay="1000"
                state="morph-heart"
                colors="primary:#e83a30">
            </lord-icon>by <span className='text-2xl text-white m-1'>MITISH RAINA</span></span>
        </div>
    )
}

export default Footer
