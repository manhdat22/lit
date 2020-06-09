/* global chrome */ 

class CardModel{
  // Card cần có tiêu đề, và nếu toàn bộ item trong Card đó done thì completed cũng được chuyển thành done để filter sau này
  constructor(title, completed, show) {
    this.name = 'Card';
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
    return CardModel.where(query)[0];
  }
  // Instance methods

  create() {};

  update() {};

  delete() {};

  toggle() {
    this.show = !this.show;
  };
};

export default CardModel;
