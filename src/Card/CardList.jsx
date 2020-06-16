/* global chrome */

import React from 'react';
import _ from 'lodash';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardList: null };
  };

  generateId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  save = event => {
    const obj = {
      type: "card",
      title: event.target.value,
      createdAt: Date.now(),
      completed: false
    };

    chrome.storage.sync.set({[this.generateId()]: JSON.stringify(obj)}, function () {
      chrome.storage.sync.get(function (data) {
        console.log(data);
      });
    });

    this.props.closeInput();
  }

  componentDidMount = () => {
    chrome.storage.sync.get(function (obj) {
      var cardList = [];
      Object.keys(obj).forEach((key) => {
        const id = {id: key}
        const data = JSON.parse(obj[key])
        if (data.type === 'card') cardList.push({...id, ...data});
      });

      this.setState({cardList: _.orderBy(cardList, 'createdAt', 'desc')});
    }.bind(this));
  };

  renderNewCard = () => {

  }

  render = () => {
    if (!this.state.cardList) return (<center>loading ...</center>)

    return (
      <>
        {this.state.cardList.map(card => (
          <Card key={card.id} id={card.id} title={card.title} />
        ))}

        {this.props.addNewCard && (
          <>
            <textarea autoFocus onBlur={this.save}></textarea>
            <input
              type="input"
              name="content"
              className="l-checklist__input"
              // value={this.state.content}
              // onBlur={this.closeInput}
              // onChange={this.handleChange}
              // onKeyPress={this.handleKeyPress}
            />
          </>
        )}
      </>
    );
  };
};

export default CardList;
