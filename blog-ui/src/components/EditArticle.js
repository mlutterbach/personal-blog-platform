import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CreateArticle.css';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const EditArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${apiUrl}/articles/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setTags(response.data.tags);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleFileChange = (e) => {
    setScreenshots(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('article[title]', title);
    formData.append('article[content]', content);
    formData.append('article[tags]', tags);

    Array.from(screenshots).forEach((file, index) => {
      formData.append(`article[screenshots][]`, file);
    });

    try {
      await axios.put(`${apiUrl}/articles/${id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Article updated successfully!');
      setTimeout(() => {
        navigate(`/articles/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Error updating article:', error);
      setSuccessMessage('Error updating article. Please try again.');
    }
  };

  return (
    <div className="create-article-container">
      <form onSubmit={handleSubmit} className="create-article-form">
        <h2>Edit Article</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea className="input-field" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <input type="text" className="input-field" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Upload New Screenshots (optional):</label>
          <input type="file" multiple onChange={handleFileChange} className="file-input" />
        </div>
        <button type="submit" className="submit-button">Update Article</button>
      </form>
    </div>
  );
};

export default EditArticle;
