import React from 'react';
import { Router } from "@reach/router"
import Home from './pages/home';
import './styles/style.css'
import TopPicks from './pages/top-picks';

function App() {
  return (
    <Router>
      <Home path="/"/>
      <TopPicks path="top-picks"/>
    </Router>
  );
}

export default App;
