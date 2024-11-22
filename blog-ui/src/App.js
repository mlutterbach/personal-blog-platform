import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Navbar, Footer, Home, ArticleList, Article, CreateArticle, EditArticle,
  EditProject, Contact, Resume, Register, Login, Projects, CreateProject
} from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
