import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'https://personal-blog-platform.onrender.com';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [image, setImage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('project[title]', title);
    formData.append('project[description]', description);
    formData.append('project[github_url]', githubUrl);
    formData.append('project[project_link]', projectLink);
    formData.append('project[image]', image);

    try {
      const response = await axios.post(`${apiUrl}/projects`, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Project created:', response.data);

      setTitle('');
      setDescription('');
      setGithubUrl('');
      setProjectLink('');
      setImage('');

      setSuccessMessage('Project created successfully!');
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log('Error creating project:', error);
      setSuccessMessage('Error creating project. Please try again.');
    }
  };

  return (
    <div className="create-article-container">
      <form onSubmit={handleSubmit} className="create-article-form">
        <h2>Create New Project</h2>
        {user && <p>Logged in as: {user.email}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>description:</label>
          <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Project Link:</label>
          <input type="text" className="input-field" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Github Url:</label>
          <input type="text" className="input-field" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
        </div>
        <div className="form-group">
          <label>image:</label>
          <input type="file" className="file-input" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="submit-button">Create Project</button>
      </form>
    </div>
  )
};

export default CreateProject;
