import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';
import Article from './components/Article';

function App() {
  return (
    <Router>
      <div>
        <CreateArticle />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
