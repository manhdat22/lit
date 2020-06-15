/* global chrome */

import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardList: null };
  };

  generateId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  save = e => {
    let obj = {
      type: "card",
      title: e.target.value,
      completed: false
    };

    chrome.storage.sync.set({[this.generateId()]: JSON.stringify(obj)}, function() {
      chrome.storage.sync.get(function (data) {
        console.log(data);
        this.props.addNewCard = false;
      });
    }).bind(this);
  }

  componentDidMount = () => {
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

        {this.props.addNewCard && (
          <textarea autoFocus onBlur={this.save}></textarea>
        )}
      </>
    );
  };
};

export default CardList;
