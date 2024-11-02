import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h2>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </h2>
          <p><strong>Published At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
