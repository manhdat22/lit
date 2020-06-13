/* global chrome */

import React from 'react';
import ItemList from "../Item/ItemList"

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      title: this.props.title,
      completed: false,
      opened: false
    };
  };

  handleChange = event => {
    this.setState({title: event.target.value});
  };

  handleKeyPress = event => {
    if(event.key === 'Enter') this.closeInput();
  };

  update = () => {
    let obj = {
      type: 'card',
      title: this.state.title
    };

    chrome.storage.sync.set({[this.state.id]: JSON.stringify(obj)}, function() {
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
    this.update();
  };

  renderCardTitleInput = () => (
    <input
      autoFocus
      type="input"
      name="title"
      className="c-card__input"
      value={this.state.title}
      onBlur={this.closeInput}
      onKeyPress={this.handleKeyPress}
      onChange={this.handleChange}
    />
  )

  renderCardTitle = () => (
    <p className="c-card__title" onClick={this.openInput}>{this.state.title}</p>
  )

  render= () => (
    <>
      <div className="c-card">
        <div className="c-card__header">
          {(this.state.opened) ? this.renderCardTitleInput() : this.renderCardTitle()}
        </div>
        <div className="c-card__body">
          <div className="c-card__body">
            <ItemList cardId={this.props.id} />
          </div>
        </div>
      </div>

      <div className="c-seperator"></div>
    </>
  );
};

export default Card;
