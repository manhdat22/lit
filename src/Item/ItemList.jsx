/* global chrome */

import React from 'react';
import _ from 'lodash';
import Item from './Item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemList: null };
  };

  componentDidMount = () => {
    chrome.storage.sync.get(function (obj) {
      var itemList = [];
      Object.keys(obj).forEach((key) => {
        const id = {id: key}
        const data = JSON.parse(obj[key])
        if (data.type === 'item' && data.cardId === this.props.cardId) {
          itemList.push({...id, ...data})
        };
      });

      this.setState({itemList: _.orderBy(itemList, 'createdAt', 'asc')});
    }.bind(this));
  };

  generateId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  save = (event) => {
    if (_.isEmpty(event.target.value)) {
      this.props.closeNewItemInput();
      return;
    }
    const obj = {
      type: 'item',
      content: event.target.value,
      cardId: this.props.cardId,
      completed: false,
      createdAt: Date.now()
    };
    chrome.storage.sync.set({[this.generateId()]: JSON.stringify(obj)});
    this.props.closeNewItemInput();
  }

  autoGrow = event => {
    const element = event.target
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  };

  handleChange = event => {
    this.setState({content: event.target.value});
    this.autoGrow(event);
  };

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      event.preventDefault();
      this.save(event, true)
    };
  };

  handleBlur = event => {
    this.save(event, false);
  };

  initInput = event => {
    let val = event.target.value;
    event.target.value = ""
    event.target.value = val;
    this.autoGrow(event);
  }

  renderNewItemInput = () => (
    <div className="c-checkbox">
      <input type="checkbox" disabled className="c-checkbox__input" />
      <textarea
        autoFocus
        type="input"
        name="content"
        className="l-checklist__input"
        onBlur={this.handleBlur}
        onFocus={this.initInput}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}>
      </textarea>
    </div>

  );

  render = () => {
    if (this.state.itemList || this.props.newItem) {
      return (
        <ul className="l-checklist">
          {this.state.itemList.map(item => (
            <Item key={item} item={item} />
          ))}

          {this.props.newItem && this.renderNewItemInput()}
        </ul>
      );
    }
    return (<></>)
  };
};

export default ItemList;
