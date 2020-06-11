/* global chrome */ 

import React from 'react';
import Item from './Item.jsx';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemList: null };
  };
  
  componentDidMount() {
    chrome.storage.sync.get(function (obj) {
      let data = Object.keys(obj).map((key) => {
        let id = {id: key}
        let data = JSON.parse(obj[key])
        
        return (data.type === 'item' && data.cardID === this.props.cardID)
          ? {...id, ...data} 
          : null;
      }).filter((item) => {return item != null});
      
      this.setState({itemList: data});
    }.bind(this));
  }

  render() {
    if (this.state.itemList) {
      return (
        <ul className="l-checklist">
          {this.state.itemList.map(item => (
            <Item key={item} cardID={item.cardID} id={item.id} content={item.content}/>
          ))}
        </ul>
      );
    }
    return (<span>Loading...</span>)
  };
};

export default Items;
