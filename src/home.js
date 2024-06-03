import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Tesla', image: 'https://images.hdqwalls.com/download/elonmusk-mars-space-x-05-1080x1920.jpg' },
  { name: 'Apple', image: 'https://images.hdqwalls.com/download/apple-glowing-logo-4k-tx-1080x1920.jpg' },
  { name: 'US Government', image: 'https://c0.wallpaperflare.com/preview/475/474/559/congress-government-united-states-legislature.jpg' },
  { name: 'TechCrunch', image: 'https://logowik.com/content/uploads/images/techcrunch2468.jpg' },
  { name: 'Wall st. Journal', image: 'https://pbs.twimg.com/media/GGwcSmjXAAE6Yax?format=jpg&name=4096x4096' },
];

function HomePage() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
      navigate(`/news/${category}`);
   };

return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {categories.map((category, index) => (
        <div
          key={index}
          className="image-container"
          onClick={() => handleCategoryClick(category.name)}
        >
          <img src={category.image} alt={category.name} />
          <div className="category-name">
            {category.name.split('').map((letter, idx) => (
              <span key={idx}>{letter}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
