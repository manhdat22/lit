import React from 'react';
import Card from './Card';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <>
        {cardList().map(card => (
          <Card key={card.id} title={card.title} />
        ))}
      </>
    );
  };
};

const cardList = () => {
  return [{id: 1, title: "Dat"}, {id: 2, title: "Test"}]
};

export default Cards;
