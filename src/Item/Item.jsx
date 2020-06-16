/* global chrome */

import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);

    const item = this.props.item;
    this.state = {
      id: item.id,
      cardId: item.cardId,
      content: item.content,
      completed: item.completed,
      opened: false
    };
  };

  componentDidUpdate = (_, prevState) => {
    if(prevState.completed !== this.state.completed) this.save()
  }

  save = () => {
    let obj = {
      type: 'item',
      cardId: this.props.cardId,
      content: this.state.content,
      completed: this.state.completed
    };

    chrome.storage.sync.set({[this.state.id]: JSON.stringify(obj)}, function() {
      chrome.storage.sync.get(function (data) {
        // console.log(data);
      });
    });
  };

  handleClickCheckbox = event => {
    this.setState({completed: event.target.checked});
  };

  handleChange = event => {
    this.setState({content: event.target.value});
    this.autoGrow(event);
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

  autoGrow = event => {
    console.log(1);

    const element = event.target
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  handleKeyPress = event => {
    if(event.key === 'Enter') this.closeInput();
  };

  renderItemInput = () => (
    <div className="c-checkbox">
      <input type="checkbox" checked={this.state.completed} className="c-checkbox__input" />
      <textarea
        autoFocus
        type="input"
        name="content"
        className="l-checklist__input"
        value={this.state.content}
        onBlur={this.closeInput}
        onFocus={this.autoGrow}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}>
      </textarea>
    </div>

  );

  renderItemContent = () => (
    <div className="c-checkbox">
      <input
        id={this.props.item.id}
        type="checkbox"
        name="completed"
        className="c-checkbox__input"
        checked={this.state.completed}
        onChange={this.handleClickCheckbox}
      />
      <label className="c-checkbox__label" onClick={this.openInput}>{this.state.content}</label>
    </div>
  );

  render = () => (
    <li className="l-checklist__item">
      {(this.state.opened) ? this.renderItemInput() : this.renderItemContent()}
    </li>
  );
};

export default Item;
