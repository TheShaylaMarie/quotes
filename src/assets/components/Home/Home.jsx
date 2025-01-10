import React, { useEffect, useState } from 'react'
import "../Home/home.css"
import axios from 'axios';
import imagesList from './Images';




export default function home() {

    const [quoteData, setQuoteData] = useState([]);
    const [quote, setQuote] = useState(localStorage.getItem("quote"));

    const [fontData, setFontData] = useState([]);
    const [font, setFont] = useState([]);

    const [colorData, setColorData] = useState({ color: "#e5e5e5", WebkitTextStrokeColor: "#e5e5e5" });

    const [image, setImage] = useState(Math.floor(Math.random() * imagesList.length));

    const [favorite, setFavorite] = useState([]);


    const [favoritesObj, setFavoritesObj] = useState(localStorage.getItem("favorite_obj"))

    const api_url_font = "https://www.googleapis.com/webfonts/v1/webfonts?key="
    const api_key_font = import.meta.env.VITE_API_KEY_FONTS;


    const api_url_quotes = "https://api.api-ninjas.com/v1/quotes";
    const api_key_quotes = import.meta.env.VITE_API_KEY_QUOTES;


    useEffect(() => {
        fetchFonts();
    }, []);

    useEffect(() => {
        getQuote();
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", favorite)
    }, [favorite])

    // useEffect(() => {
    //     localStorage.setItem("quote", quote)
    // }, [quote])

    useEffect(() => {
        localStorage.setItem("favorite_obj", favoritesObj)
    }, [favoritesObj])


    // CAPTURE USER SELECTED COLORS FOR FONT AND STROKE
    function captureColorData(colorValue, colorPicker) {


        if (colorPicker === "text-color") {
            setColorData({ ...colorData, color: colorValue })
        }
        else {
            setColorData({ ...colorData, WebkitTextStrokeColor: colorValue })
        }
    }






    // SAVE FAVORITES
    function saveFavoriteObj() {

        const favorite_object = {}
        setFavoritesObj(favoritesObj.push(
            {
                quote: quote,
                color: "blue",
                author: "Someone"
            }
        ))
    }




    // GET FONTS FROM API
    function fetchFonts() {
        axios.get(api_url_font + api_key_font)
            .then(response => {
                const fonts = response.data.items;
                if (fonts && fonts.length > 0) {

                    setFontData(fonts);
                    randomizeFont(fonts);

                }
            })
            .catch((err) => {
                console.log("Error recieving font data", err)
            })

    }

    // RANDOMLY CHOOSE FONT
    function randomizeFont(fonts) {
        if (fonts && fonts.length > 0) {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            const fontFile = new FontFace(randomFont.family, `url(${randomFont.files.regular})`);


            fontFile.load().then(() => {
                document.fonts.add(fontFile);
                document.body.classList.add("fonts-loaded");
                setFont(randomFont.family);
            })
                .catch((err) => {
                    console.log(err);
                });
        }

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
            <div className='title-container'>
                <h1>Inspire</h1>
                <h3>Quote Generator</h3>
            </div>
            <div className='card-container'>

                <blockquote className='quote-container'>
                    <div className='img-container'>
                        <img
                            key={image}
                            src={imagesList[image].src}
                            alt={imagesList[image].alt}
                            style={{ width: "100%", maxWidth: "auto", opacity: 0.6 }}
                        />

                    </div>
                    <div className='quote-text' style={{
                        ...colorData,
                        fontFamily: font ? `'${font}', sans-serif` : 'inherit',

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
                    <button onClick={() => { getQuote(); randomizeFont() }}>Random</button>

                    <button onClick={() => getImage()}>New Image</button>

                    <button onClick={() => getQuote()}>New Quote</button>

                    <button onClick={() => randomizeFont(fontData)}>New Font</button>

                    {/* <button>Favorite</button> */}

                </div>

                <div className='color-picker-container'>

                    <label htmlFor="quote-text-color" className='color-picker-label'>Text Color
                        <input type="color"
                            value={colorData.color}
                            id="quote-text-color"
                            className="color-picker"
                            onChange={(e) => captureColorData(e.target.value, "text-color")}
                        />
                    </label>

                    <label htmlFor="quote-stroke-color" className='color-picker-label'>Stroke Color
                        <input type="color"
                            value={colorData.WebkitTextStrokeColor}
                            id="quote-stroke-color"
                            className="color-picker"
                            onChange={(e) => captureColorData(e.target.value, "stroke-color")}
                        />
                    </label>

                </div>
            </div>
        </>
    )
}
