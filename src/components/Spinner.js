import React from 'react'
import  loading  from './loaders.gif'

const Spinner = () => {
 
    return (
      <div className='text-center container'>
        <img className='my-3' src={loading} alt="loading" style={{height:'50px',width:'50px',}} />
      </div>
    )
}

export default Spinner
