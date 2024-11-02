import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';
import Article from './components/Article';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
