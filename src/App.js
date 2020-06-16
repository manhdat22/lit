import React from 'react';
import './App.css';
import CardList from './Card/CardList';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {addNewCard: false};
  }

  closeInput = () => {
    this.setState({addNewCard: false});
    window.location.reload(false);
  }

  render = () => {
    console.log(this.state.addNewCard);

    return (
      <div className="App">
        <header className="l-header">
          <p className="l-header__title">#Lít</p>
          <button className="l-header__add-button" onClick={() => this.setState({addNewCard: true})}>+</button>
        </header>
        <div className="c-seperator"></div>

        <section className="l-body">
          <CardList addNewCard={this.state.addNewCard} closeInput={this.closeInput}/>
        </section>
      </div>
    )
  };
};

export default App;
