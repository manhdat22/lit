/* global chrome */ 

import React from 'react';
import Card from './Card';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: null
    };
  };

  componentDidMount() {
    chrome.storage.sync.get(function (obj) {
      let data = Object.keys(obj).map((key) => {
        let id = {id: key}
        let data = JSON.parse(obj[key])
        return {...id, ...data}
      });
      
      this.setState({cardList: data});
    }.bind(this));
  }

  render() {
    if (this.state.cardList) {
      return (
        <>
          {this.state.cardList.map(card => (
            <Card key={card.id} id={card.id} title={card.title} />
          ))}
        </>
      );
    }
    return (<span>Loading...</span>)
  };
};

export default Cards;
