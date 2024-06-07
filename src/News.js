import React, { useState, useEffect, useRef} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaSearch,FaHome} from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './News.css';

function Newscontent({category,data,slideIndex}) {
  const sliderRef=useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    ref:sliderRef,
  };

  useEffect(()=>{
    if(sliderRef.current && slideIndex!==null){
      //console.log(sliderRef.current);
        sliderRef.current.slickGoTo(slideIndex);
    }
  });

  return (
    <>
      <div className="news-container">
        <p className="heading">NEWS ABOUT {category.toUpperCase()}</p>
        <Slider  ref={sliderRef}{...settings}>
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

function SearchResult({result,onClick}){
  return(<div className="searchresult" onClick={onClick}>{result.title}</div>)
}

function Navbar({data,setSlideIndex}){
  const navigate = useNavigate();

  const goHome = () => {
    navigate(-1);  
  };

  return(
    <>
  <nav className="navbar">
    <div className="navbar-text">The Christian</div>
    <Searchbar data={data} setSlideIndex={setSlideIndex}/>
    <div className="navbar-logo" onClick={goHome}>
        <FaHome className="home-icon" />
        </div>
  </nav>
  </>
  );
}

function Searchbar({data,setSlideIndex}) {
  const [input,setInput]=useState("")
  const [results,setResults]=useState([])


  const handleChange = (value) =>{
    setInput(value);
    const result=data.filter((articles)=>{
      return (
        value &&
        articles &&
        articles.urlToImage &&
        articles.title &&
        articles.title.toLowerCase().includes(value)
      );
    });
    setResults(result);
  }

  const handleResultClick = (index) => {
    // console.log(index);
    // console.log("---")
    // console.log("size:",results.length);
    // console.log(results);
    setSlideIndex(index);
    setInput("");
    setResults([]);
  };

  return (
    <>
    <div className="search-container">
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    <div className="resultlist">
      {results.map((result,id)=>{
        const index = data.indexOf(result);
        //console.log("size:",results.length)
        return <SearchResult result={result} key={id} onClick={() => handleResultClick(index)}/>
      })}
    </div>
    </div>  
    </>
  );
}

export default function News() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(null);
  //const goToSlide = useRef(null);

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
        //console.log(data);
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
  return (
    <>
      <Navbar data={data} setSlideIndex={setSlideIndex}/>
      <Newscontent  category={category} data={data} slideIndex={slideIndex}/>
    </>
  );
}
