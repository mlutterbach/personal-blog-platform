import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Article.css';
import '../styles/Tags.css'

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError('Error fetching article');
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/articles/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/articles');
    } catch (err) {
      console.error('Error deleting article:', err);
      setError('Error deleting article');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Loading article...</div>;
  }

  const tagsArray = article.tags ? article.tags.split(',').map(tag => tag.trim()) : [];
  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <div className="tags-container">
        {tagsArray.map((tag, index) => (<span key={index} className="tag"> {tag} </span>))}
      </div>
      <p><strong>Published At:</strong> {formattedDate}</p>
      <p className="article-content">{article.content}</p>

      {/* Render Screenshots */}
      {article.screenshots && article.screenshots.length > 0 && (
        <div className="screenshots">
          <h3>Screenshots:</h3>
          {article.screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot.url}
              alt={`Screenshot ${index + 1}`}
              className="screenshot-image"
            />
          ))}
        </div>
      )}

      {isLoggedIn && (
        <div className="article-actions">
          <button onClick={() => navigate(`/articles/${id}/edit`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Article;
