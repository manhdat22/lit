/* global chrome */ 

import React from 'react';
import Card from './Card';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardList: null };
  };

  componentDidMount() {
    chrome.storage.sync.get(function (obj) {
      let data = Object.keys(obj).map((key) => {
        let id = {id: key}
        let data = JSON.parse(obj[key])
        
        return (data.type === 'card') ? {...id, ...data} : null;
      }).filter((card) => {return card != null});
      
      this.setState({cardList: data})
    }.bind(this));
  }

  render() {
    console.log(this.state.cardList);
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
