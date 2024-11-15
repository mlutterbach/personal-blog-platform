import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';
import '../styles/Tags.css';

const apiUrl = process.env.REACT_APP_API_URL || 'https://personal-blog-platform.onrender.com';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/articles`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setArticles(response.data);
      } catch (err) {
        setError('Error fetching articles');
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!articles.length) {
    return <div>Loading articles...</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredArticles = articles.filter(article =>
    article.tags.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="article-list-container">
      <h1>Blogs</h1>
      <p>Check out some of my blogs</p>

      <input type='text' placeholder='Search by tag...' value={searchTerm} onChange={handleSearch} className='tag-search-input' />


      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-item">
            {article.screenshots && article.screenshots.length > 0 && (
              <img src={article.screenshots[0].url} alt="Thumbnail" className="thumbnail" />
            )}
            <div className="article-content">
              <h2>
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
              </h2>
              <p><strong>Published At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>

              {/* Render tags as individual styled elements */}
              <div className="tags-container">
                {article.tags.split(',').map((tag, index) => (
                  <span key={index} className="tag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
