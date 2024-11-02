import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/articles`, {
        article: { title, content, tags }
       }, {
          headers: {
            'Accept': 'application/json'
          }
      });
      console.log('Article created:', response.data);

      // Reset form fields
      setTitle('');
      setContent('');
      setTags('');

      setSuccessMessage('Article created successfully!');
      setTimeout(() => {
        navigate('/articles')
      }, 2000);
    } catch (error) {
      console.log('Error creating article:', error);
      setSuccessMessage('Error creating article. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create New Article</h2>
        {successMessage && <p>{successMessage}</p>}
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Tags:</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type='submit'>Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
