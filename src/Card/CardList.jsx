/* global chrome */

import React from 'react';
import _ from 'lodash';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: null,
      reload: false
    };
  };

  generateId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  save = event => {
    if (_.isEmpty(event.target.value)) {
      this.props.closeInput();
      return;
    }
    const obj = {
      type: "card",
      title: event.target.value,
      createdAt: Date.now(),
      completed: false
    };
    chrome.storage.sync.set({[this.generateId()]: JSON.stringify(obj)});
    this.props.closeInput();
  }

  componentDidMount = () => {
    chrome.storage.sync.get((obj) => {
      var cardList = [];
      Object.keys(obj).forEach((key) => {
        const id = {id: key}
        const data = JSON.parse(obj[key])
        if (data.type === 'card') cardList.push({...id, ...data});
      });

      this.setState({cardList: _.orderBy(cardList, 'createdAt', 'asc')});
    })
  };

  initInput = event => {
    let val = event.target.value;
    event.target.value = ""
    event.target.value = val;
    this.autoGrow(event);
  }

  autoGrow = event => {
    const element = event.target
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  };

  handleChange = event => {
    this.setState({title: event.target.value});
    this.autoGrow(event);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.save(event);
    }
  };

  handleBlur = event => {
    this.save(event);
  };

  renderNewCard = () => {
    return (
      <>
        <div className="c-card">
          <div className="c-card__header">
            <textarea
              autoFocus
              name="title"
              className="c-card__input"
              defaultValue="Checklist"
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              onFocus={this.initInput}>
            </textarea>
          </div>
          <div className="c-card__body">
            <ul class="l-checklist"></ul>
          </div>
        <div className="c-seperator editing"></div>
        </div>
      </>
    )
  }

  render = () => {
    if (!this.state.cardList) return (<center>loading ...</center>)

    return (
      <>
        {this.state.cardList.map(card => (
          <Card key={card.id} card={card} />
        ))}

        {this.props.newCard && this.renderNewCard()}
      </>
    );
  };
};

export default CardList;
