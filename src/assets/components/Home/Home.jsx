import React, { useEffect, useState } from 'react'
import "../Home/home.css"
import axios from 'axios';




export default function home() {

const [quoteData, setQuoteData] = useState([]);
const [fontData, setFontData] = useState([]);
const [colorData, setColorData] = useState({color: "black", WebkitTextStrokeColor: "white" });


const [favorite, setFavorite] = useState([]);
const [quote, setQuote] = useState(localStorage.getItem("quote"));
const [favoritesObj, setFavoriteObj] = useState(localStorage.getItem("favorite_obj"))

const api_url_font = "https://www.googleapis.com/webfonts/v1/webfonts?key="
const api_key_font = import.meta.env.VITE_API_KEY_FONTS;
// console.log(api_key_font);

const api_url_quotes = "https://api.api-ninjas.com/v1/quotes";
const api_key_quotes = import.meta.env.VITE_API_KEY_QUOTES;
// const api_function_quotes = ""



// Capture user selected colors for font and stroke
function captureColorData(colorValue, colorPicker) {
//    console.log(colorValue, colorPicker);

const favorite_object = {}

    if(colorPicker === "text-color") {
        setColorData({...colorData, color: colorValue})
    }
    else {
        setColorData({...colorData, WebkitTextStrokeColor: colorValue})
    }
}




useEffect(() =>{
    localStorage.setItem("favorites", favorite)
}, [favorite])

useEffect(() =>{
    localStorage.setItem("quote", quote)
}, [quote])

useEffect(() =>{
    localStorage.setItem("favorite_obj", favoritesObj)
}, [favoritesObj])


function saveFavoriteObj() {
    setFavoriteObj(favoritesObj.push(
        {
        quote: quote,
        color: "red",
        author: "Someone"
    }
    ))
}



function getQuote() {

    axios.get(api_url_quotes, {
        headers: {
            "X-Api-Key": api_key_quotes
        }
    })
    .then(response => {
        console.log(response.data);      
        setQuoteData(response.data);
    })
    .catch((err) => {
        console.log("Error retrieving quote data.");
        console.log(err);
    })

}



  return (
    <>
        <h1>Inspire</h1>
        <h4>Quote Generator</h4>
    <div className='card-container'>
        
        <blockquote className='quote-container'>
            <p className='quote-text' style={colorData} >"Quote"
                
            </p>
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
