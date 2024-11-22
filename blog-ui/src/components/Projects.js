import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Projects.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const apiUrl = process.env.REACT_APP_API_URL || 'https://personal-blog-platform.onrender.com';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/projects/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Error deleting project');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">
                {project.description} {' '}
                <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Visit Project
                </a>
              </p>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                <FaGithub /> Github Repo
              </a>
            </div>
            <div className="project-image-wrapper">
              {project.image && project.image.url && (
                <img src={project.image.url} alt={project.title} className="project-image" />
              )}
            </div>

            {isLoggedIn && (
              <div className="project-actions">
                <button onClick={() => navigate(`/projects/${project.id}/edit`)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
