import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <div className='image-section'>
        <img src={`${process.env.PUBLIC_URL}/profile.jpg`} alt='Profile' className='profile-image' />
      </div>
      <div className='intro-section'>
        <h1>Hello, I'm Marcos</h1>
        <h2>A bit about me</h2>
        <p>Welcome to my personal site! I am passionate about programming, technology, languages.
        Web Developer in Ruby/Ruby on Rails and Javascript/Node.js since going through an awesome bootcamp
        in Madrid. I've built this site to share a bit of what I've learned since 2022.
        Take a look at my resume, projects, and blog, or feel free to contact me.</p>
        <div className="circle-container">
          <div className="circle resume" onClick={() => navigate('/resume')}>Resume</div>
          <div className="circle projects" onClick={() => navigate('/projects')}>Projects</div>
          <div className="circle blog" onClick={() => navigate('/articles')}>Blog</div>
          <div className="circle contact" onClick={() => navigate('/contact')}>Contact</div>
        </div>
      </div>
    </div>
  )
}

export default Home;
