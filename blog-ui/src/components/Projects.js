import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Projects.css'
import { FaGithub } from 'react-icons/fa';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

const Projects = () => {
  const [projects, setProjects] = useState([]);

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
                <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="project-link" >
                  Visit Project
                </a>
              </p>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link" >
                  <FaGithub /> Github Repo
              </a>
            </div>
            <div className="project-image-wrapper">
              {project.image && project.image.url && (
                <img src={project.image.url} alt={project.title} className="project-image" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
