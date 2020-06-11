/* global chrome */ 

import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      cardId: this.props.cardId,
      content: this.props.content,
      completed: false,
      opened: false
    };
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
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

  handleKeyPress = event => {
    if(event.key === 'Enter') this.closeInput();
  };

  update = () => {
    let obj = {
      type: 'item',
      cardId: this.props.cardId,
      content: this.state.content,
      completed: this.state.completed
    };
    
    chrome.storage.sync.set({[this.state.id]: JSON.stringify(obj)}, function() {
      chrome.storage.sync.get(function (data) {
        console.log(data);
      });
    });
  };

  render() { 
    let itemInput = (
      <input 
        autoFocus
        type="input"
        name="content"
        className="l-checklist__input"
        value={this.state.content}
        onBlur={this.closeInput}
        onChange={this.handleChange}
      />
    );

    let itemContent = (
      <div className="c-checkbox">
        <input
          id="option_1"
          type="checkbox"
          name="completed"
          onChange={this.handleChange} 
          className="c-checkbox__input"
        />
        <label className="c-checkbox__label">{this.state.content}</label>
      </div>
    );

    return(
      <li className="l-checklist__item" onClick={this.openInput}>
        {(this.state.opened) ? itemInput : itemContent}
      </li>
    );
  };
};

export default Item;
