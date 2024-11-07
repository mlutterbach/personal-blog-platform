import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateArticle.css';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (!token || !storedUserId) {
      navigate('/login');
    } else {
      axios.get(`${apiUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        navigate('/login');
      });
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setScreenshots(e.target.files);
  };

  const handleTextAreaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('article[title]', title);
    formData.append('article[content]', content);
    formData.append('article[tags]', tags);

    Array.from(screenshots).forEach((file) => {
      formData.append('article[screenshots][]', file);
    });

    try {
      const response = await axios.post(`${apiUrl}/articles`, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Article created:', response.data);

      setTitle('');
      setContent('');
      setTags('');
      setScreenshots([]);

      setSuccessMessage('Article created successfully!');
      setTimeout(() => {
        navigate('/articles');
      }, 2000);
    } catch (error) {
      console.log('Error creating article:', error);
      setSuccessMessage('Error creating article. Please try again.');
    }
  };

  return (
    <div className="create-article-container">
      <form onSubmit={handleSubmit} className="create-article-form">
        <h2>Create New Article</h2>
        {user && <p>Logged in as: {user.email}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea className="input-field" value={content} onChange={(e) => setContent(e.target.value)} onInput={handleTextAreaResize} required></textarea>
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <input type="text" className="input-field" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Upload screenshots:</label>
          <input type="file" multiple onChange={handleFileChange} className="file-input" />
        </div>
        <button type="submit" className="submit-button">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
