import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Articles from './components/Articles';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <SubHeader />
      <Router className="router">
        <Articles path="/" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
