import React, { useState } from 'react'
import "../Home/home.css"

export default function home() {

const [quoteData, setQuoteData] = useState([]);
const [fontData, setFontData] = useState([]);
const [colorData, setColorData] = useState({color: "black", WebkitTextStrokeColor: "white" });

const api_url = "https://www.googleapis.com/webfonts/v1/webfonts?key="
const api_key = import.meta.env.VITE_API_KEY_FONTS;
// console.log(api_key);


function captureColorData(colorValue, colorPicker) {
//    console.log(colorValue, colorPicker);

    if(colorPicker === "text-color") {
        setColorData({...colorData, color: colorValue})
    }
    else {
        setColorData({...colorData, WebkitTextStrokeColor: colorValue})
    }
}

  return (
    <>
        <h1>Inspire</h1>
        <h4>Quote Generator</h4>
    <div className='card-container'>
        
        <blockquote className='quote-container'>
            <p className='quote-text' style={colorData} >"Quote"</p>
        </blockquote> 



        <div className='button-container' >
        <button>Random</button>
        <button>New Image</button>
        <button>New Quote</button>
        <input type="color" 
                id="quote-text-color"
                className="color-picker"
                onChange={(e) => captureColorData(e.target.value, "text-color")} 
        />
        <input type="color" 
                id="quote-stroke-color"
                className="color-picker"
                onChange={(e) => captureColorData(e.target.value, "stroke-color")} 
        />
        
        </div>
    </div>
    </>
  )
}
