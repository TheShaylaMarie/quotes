import React from 'react'
import "../Home/home.css"

export default function home() {




  return (
    <>
        <h1>Inspire</h1>
        <h4>Quote Generator</h4>
    <div className='card-container'>
        
        <blockquote >
            <p className='quote-container'>"Quote"</p>
        </blockquote> 



        <div className='button-container' >
        <button>Random</button>
        <button>New Image</button>
        <button>New Quote</button>
        </div>
    </div>
    </>
  )
}
