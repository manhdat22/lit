/* global chrome */

import React from 'react';
import Item from './Item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemList: null };
  };

  componentDidMount() {
    chrome.storage.sync.get(function (obj) {
      var itemList = [];
      Object.keys(obj).forEach((key) => {
        const id = {id: key}
        const data = JSON.parse(obj[key])
        if (data.type === 'item' && data.cardID === this.props.cardID) {
          itemList.push({...id, ...data})
        };
      });
      this.setState({itemList: itemList});
    }.bind(this));
  };

  render = () => {
    if (this.state.itemList) {
      return (
        <ul className="l-checklist">
          {this.state.itemList.map(item => (
            <Item key={item} item={item} />
          ))}
        </ul>
      );
    }
    return (<span>Loading...</span>)
  };
};

export default ItemList;
