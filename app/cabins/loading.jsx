import React from 'react'
import Spinner from '../_components/Spinner'

function loading() {
    return (
        <div className='grid justify-center items-center'>
            <Spinner/>
            <p className='text-primary-200 text-xl'>Cabin data loading...</p>
        </div>
    )
}

export default loading