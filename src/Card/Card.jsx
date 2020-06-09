import React from 'react';
import CardModel from "../Models/CardModel"
import Items from "../Item/Items"

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "1", 
      title: this.props.title,
      completed: false,
      opened: false
    };
  };

  changeHandler = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return(
      <>
        <div className="c-card">
          <div className="c-card__header">
            <p className="c-card__title">{this.state.title}</p>
          </div>
          <div className="c-card__body">
            <div className="c-card__body">
              <Items cardId={this.state.id}/>
            </div>
          </div>
        </div>

        <div className="c-seperator"></div>
      </>
    );
  };
};

export default Item;
