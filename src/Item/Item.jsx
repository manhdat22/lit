/* global chrome */

import React from 'react';
import _ from 'lodash';

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
    if (_.isEmpty(this.state.content)) {
      this.delete();
      return;
    }

    const obj = {
      type: 'item',
      cardId: this.props.item.cardId,
      content: this.state.content,
      completed: this.state.completed,
      createdAt: this.props.item.createdAt
    };

    chrome.storage.sync.set({[this.state.id]: JSON.stringify(obj)});
  };

  delete = () => {
    chrome.storage.sync.remove(this.state.id, () => {
      window.location.reload(false)
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
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.closeInput();
    }
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
        onFocus={this.initEdit}
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
      <label className={`c-checkbox__label ${this.state.completed ? "completed" : ""}`} onClick={this.openInput}>{this.state.content}</label>
      <div className="c-checkbox__buttons">
        <button className="c-checkbox__button-delete" onClick={this.delete}>&times;</button>
      </div>
    </div>
  );

  render = () => (
    <li className="l-checklist__item">
      {(this.state.opened) ? this.renderItemInput() : this.renderItemContent()}
    </li>
  );
};

export default Item;
