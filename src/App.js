import React from 'react';
import './App.css';
import CardList from './Card/CardList';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newCard: false};
  }

  closeInput = () => {
    this.setState({newCard: false});
    window.location.reload(false);
  }

  render = () => {
    return (
      <div className="App">
        <header className="l-header">
          <p className="l-header__title">#Lít</p>
          <button className="l-header__add-button" onClick={() => this.setState({newCard: true})}>+</button>
        </header>
        <div className="c-seperator"></div>

        <section className="l-body">
          <CardList newCard={this.state.newCard} closeInput={this.closeInput} />
        </section>
      </div>
    )
  };
};

export default App;
