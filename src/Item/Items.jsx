import React from 'react';
import Item from './Item.jsx';
import ItemModel from '../Models/ItemModel';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardId: this.props.cardId};
  };

  render() {
    return (
      <ul className="l-checklist">
        {
          itemList(this.state.cardId).map(i => (
            <Item key={i} content={i}/>
          ))
        }
      </ul>
    );
  };
};

const itemList = (cardId) => {
  return ["1","2","3","4","5","6"]
};

export default Items;
