// src/components/Article.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p><strong>Tags:</strong> {article.tags}</p>
      <p><strong>Published At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default Article;
