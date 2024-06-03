import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import './News.css';

function Newscontent() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url;
    if (category === "Apple") {
      url = 'https://newsapi.org/v2/everything?q=apple&from=2024-05-29&to=2024-05-29&sortBy=popularity&apiKey=7104760e3e5c4c6b8aa79d40ed51be1f';
    } else if (category === "Tesla") {
      url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-05-03&sortBy=publishedAt&apiKey=7104760e3e5c4c6b8aa79d40ed51be1f';
    } else if (category === "US Government") {
      url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7104760e3e5c4c6b8aa79d40ed51be1f';
    } else if (category === "TechCrunch") {
      url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7104760e3e5c4c6b8aa79d40ed51be1f';
    } else if (category === "Wall st. Journal") {
      url = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7104760e3e5c4c6b8aa79d40ed51be1f';
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.articles);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="news-container">
        <p className="heading">News about {category}</p>
        <Slider {...settings}>
          {data.map((article, index) => {
            if (!article.urlToImage) {
              return null;
            }
            return (
              <div key={index} className="news-article">
                <div className="h-60 rounded-t-xl flex justify-center items-center">
                  <img src={article.urlToImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-xl font-semibold">{article.title}</p>
                  <p className="author">Author: {article.author ? article.author : "anonymous"}</p>
                  <button className="read-more-button">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

function Searchbar() {
  return (
    <form className="sbc">
      <input type="text" className="searchbar" placeholder="Search..." />
    </form>
  );
}

export default function News() {
  return (
    <>
      <Searchbar />
      <Newscontent />
    </>
  );
}
