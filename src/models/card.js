/* global chrome */ 

class Card {
  // Card cần có tiêu đề, và nếu toàn bộ item trong Card đó done thì completed cũng được chuyển thành done để filter sau này
  constructor(title, completed, show) {
    this.name = 'Card';
    this.id = getId();
    this.title = title;
    this.completed = completed;
    this.show = show;
  };
  // class methods (static)
  // load toàn bộ dữ liệu
  static all() {
    return [];
  }

  //where với query
  static where() {
    chrome.storage.sync.get(["card_1","card_2","card_3"], function (obj) {
      console.log(obj);
    });
  }

  //find first
  static find(query) {
    return Card.where(query)[0];
  }
  // Instance methods

  create() {
    chrome.storage.sync.set({"card_1": "1", "card_2": "2", "card_3": "3"}, function () {
      console.log('Saved');
    });
  };

  update() {};

  delete() {};

  toggle() {
    this.show = !this.show;
  };
};

function getId(params) {
  
}

export default Card;
