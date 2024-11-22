import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CreateArticle.css';

const apiUrl = process.env.REACT_APP_API_URL || 'https://personal-blog-platform.onrender.com';

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setGithubUrl(response.data.githubUrl);
        setProjectLink(response.data.projectLink);
        setImage(response.data.image);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('project[title]', title);
    formData.append('project[description]', description);
    formData.append('project[github_url]', githubUrl);
    formData.append('project[project_link]', projectLink);
    formData.append('project[image]', image);

    try {
      await axios.put(`${apiUrl}/projects/${id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setTitle('');
      setDescription('');
      setGithubUrl('');
      setProjectLink('');
      setImage('');

      setSuccessMessage('Project updated successfully!');
      setTimeout(() => {
        navigate(`/projects`);
      }, 2000);
    } catch (error) {
      console.log('Error updating project:', error);
      setSuccessMessage('Error updating project. Please try again.');
    }
  };

  return (
    <div className="create-article-container">
      <form onSubmit={handleSubmit} className="create-article-form">
        <h2>Edit Project</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
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
        <button type="submit" className="submit-button">Update Project</button>
      </form>
    </div>
  )
};

export default EditProject;
