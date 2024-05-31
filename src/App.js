import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'https://api.example.com/data' with your API endpoint
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=49cffb9040fb47f4988ce701eb13faee')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.articles);
        console.log(data)
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidestoShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
        {data.map((article, index) => {
          if (!article.urlToImage) {
            return null; 
          }
          return (
            <div key={index} className="bg-white h-[450px] text-black rounded-xl">
              <div className="h-60 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img src={article.urlToImage} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{article.title}</p>
                <p>Author: {article.author}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </button>
              </div>
            </div>
          );
        })}
        </Slider>
      </div>
    </div>
  );
}

export default App;
