/* global chrome */

import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardList: null };
  };

  componentDidMount() {
    chrome.storage.sync.get(function (obj) {
      var cardList = [];
      Object.keys(obj).forEach((key) => {
        const id = {id: key}
        const data = JSON.parse(obj[key])
        if (data.type === 'card') cardList.push({...id, ...data});
      });
      this.setState({cardList: cardList});
    }.bind(this));
  };

  render() {
    if (!this.state.cardList) return (<span>Loading...</span>)
    return (
      <>
        {this.state.cardList.map(card => (
          <Card key={card.id} id={card.id} title={card.title} />
        ))}
      </>
    );
  };
};

export default CardList;
