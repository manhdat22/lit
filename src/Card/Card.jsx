/* global chrome */

import React from 'react';
import _ from 'lodash';
import ItemList from "../Item/ItemList"

class Card extends React.Component {
  constructor(props) {
    super(props);

    const card = this.props.card
    this.state = {
      title: card.title,
      completed: false,
      opened: false,
      newItem: false
    };
  };

  handleChange = event => {
    this.setState({title: event.target.value});
    this.autoGrow(event);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.closeInput();
    }
  };

  delete = () => {
    chrome.storage.sync.get((obj) => {
      var itemIds = [];
      Object.keys(obj).forEach((key) => {
        const data = JSON.parse(obj[key])
        if (data.type === 'item' && data.cardId === this.props.card.id) {
          itemIds.push(key);
        };
      });

      chrome.storage.sync.remove(itemIds, () => {
        chrome.storage.sync.remove(this.props.card.id, () => {
          window.location.reload(false)
        });
      });
    });
  };

  save = () => {
    if (_.isEmpty(this.state.title)) {
      window.location.reload(false);
      return;
    }

    const obj = {
      type: 'card',
      id: this.props.card.id,
      title: this.state.title,
      completed: this.state.completed,
      createdAt: this.props.card.createdAt
    };

    chrome.storage.sync.set({[this.props.card.id]: JSON.stringify(obj)}, function() {
      chrome.storage.sync.get(function (data) {
        console.log(data);
      });
    });
  };

  openInput = () => {
    if(this.state.opened) return;
    this.setState({opened: true});
  };

  closeInput = () => {
    if(!this.state.opened) return;
    this.setState({opened: false});
    this.save();
  };

  closeNewItemInput = () => {
    this.setState({newItem: false});
    window.location.reload(false);
  }

  initEdit = event => {
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

  isEditing = () => {
    return this.state.opened ? "editing" : "";
  };

  renderCardTitleInput = () => (
    <textarea
      autoFocus
      name="title"
      className="c-card__input"
      value={this.state.title}
      onBlur={this.closeInput}
      onKeyPress={this.handleKeyPress}
      onChange={this.handleChange}
      onFocus={this.initEdit}>
    </textarea>
  );

  renderCardTitle = () => (
    <>
      <p className="c-card__title" onClick={this.openInput}>{this.state.title}&nbsp;</p>
      <div className="c-card__buttons">
        <button className="c-card__button-add" onClick={() => this.setState({newItem: true})}>+</button>
        <button className="c-card__button-delete" onClick={this.delete}>&times;</button>
      </div>
    </>
  );

  render= () => {
    return (
      <>
        <div className="c-card">
          <div className="c-card__header">
            {(this.state.opened) ? this.renderCardTitleInput() : this.renderCardTitle()}
          </div>
          <div className="c-card__body">
            <ItemList newItem={this.state.newItem} cardId={this.props.card.id} closeNewItemInput={this.closeNewItemInput} />
          </div>

          <div className={`c-seperator ${this.state.opened ? "editing" : ""}`}></div>
        </div>
      </>
    );
  }
};

export default Card;
