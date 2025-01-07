import React, { useEffect, useState } from 'react'
import "../Home/home.css"
import axios from 'axios';
import imagesList from './Images';




export default function home() {

    const [quoteData, setQuoteData] = useState([]);
    const [quote, setQuote] = useState(localStorage.getItem("quote"));

    const [fontData, setFontData] = useState([]);
    const [font, setFont] = useState([]);

    const [colorData, setColorData] = useState({ color: "black", WebkitTextStrokeColor: "white" });

    const [image, setImage] = useState(Math.floor(Math.random() * imagesList.length));

    const [favorite, setFavorite] = useState([]);

    
    const [favoritesObj, setFavoritesObj] = useState(localStorage.getItem("favorite_obj"))

    const api_url_font = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA7NxR8gN0q3-BLzasjsyjCLcVNqJvrqis"
    const api_key_font = import.meta.env.VITE_API_KEY_FONTS;


    const api_url_quotes = "https://api.api-ninjas.com/v1/quotes";
    const api_key_quotes = import.meta.env.VITE_API_KEY_QUOTES;


    useEffect(() => {
        fetchFonts();
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", favorite)
    }, [favorite])

    useEffect(() => {
        localStorage.setItem("quote", quote)
    }, [quote])

    useEffect(() => {
        localStorage.setItem("favorite_obj", favoritesObj)
    }, [favoritesObj])


// CAPTURE USER SELECTED COLORS FOR FONT AND STROKE
    function captureColorData(colorValue, colorPicker) {
        //    console.log(colorValue, colorPicker);

        const favorite_object = {}

        if (colorPicker === "text-color") {
            setColorData({ ...colorData, color: colorValue })
        }
        else {
            setColorData({ ...colorData, WebkitTextStrokeColor: colorValue })
        }
    }






// SAVE FAVORITES
    function saveFavoriteObj() {
        setFavoritesObj(favoritesObj.push(
            {
                quote: quote,
                color: "red",
                author: "Someone"
            }
        ))
    }

// GET FONTS FROM API
    function fetchFonts() {
        axios.get(api_url_font)
        .then(response => {
            const fonts = response.data.items;
            if (fonts && fonts.length > 0 ) {
                const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                setFontData(fonts);
                setFont(randomFont.family);
            }
            console.log("response:", response)
        })
        .catch((err) => {
            console.log("Error recieving font data", err)
        })
    }


    function getRandomFont() {

    }


// GET RANDOM QUOTE
    function getQuote() {

        axios.get(api_url_quotes, {
            headers: {
                "X-Api-Key": api_key_quotes
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    setQuoteData(response.data);
                    setQuote(response.data[0].quote);
                }
            })
            .catch((err) => {
                console.log("Error retrieving quote data.", err);

            })

    }

// GET RANDOM IMAGE
function getImage() {
    setImage(Math.floor(Math.random() * imagesList.length));
}

    return (
        <>
            <h1>Inspire</h1>
            <h4>Quote Generator</h4>
            <div className='card-container'>

                <blockquote className='quote-container'>
                    <div className='img-container'>
                        <img
                            key={image}
                            src={imagesList[image].src}
                            alt={imagesList[image].alt}
                            style={{ width: "100%", maxWidth: "auto" }}
                        />

                    </div>
                    <div className='quote-text' style={{...colorData,
                    fontFamily: font || 'inherit'

                    }}>
                        {quoteData.map((quoteObj, index) => (
                            <div key={index}>
                                <p>"{quoteObj.quote}"</p>
                                <small> {quoteObj.author} </small>
                            </div>
                        ))}
                    </div>
                </blockquote>




                <div className='button-container' >
                    <button onClick={() => getQuote()}>Random</button>

                    <button onClick={() => getImage()}>New Image</button>

                    <button onClick={() => getQuote()}>New Quote</button>

                    <button onClick={() => getFont()}>New Font</button>

                    <button>Favorite</button>

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
