import React from 'react';
import './App.css';
import CardList from './Card/CardList';

function App() {
  return (
    <div className="App">
      <header className="l-header">
        <p className="l-header__title">#Lít</p>
        <button className="l-header__add-button">+</button>
      </header>
      <div className="c-seperator"></div>

      <section className="l-body">
        <CardList />
      </section>
    </div>
  );
}

export default App;
