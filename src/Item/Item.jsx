import React from 'react';
import ItemModel from "../Models/ItemModel"

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
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

  openInput = () => {
    if(this.state.opened) return;
    this.setState({opened: true});
  };

  closeInput = () => {
    if(!this.state.opened) return;
    this.setState({opened: false});
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
        onChange={this.changeHandler}
      />
    );

    let itemContent = (
      <div className="c-checkbox">
        <input
          id="option_1"
          type="checkbox"
          name="completed"
          onChange={this.changeHandler} 
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
