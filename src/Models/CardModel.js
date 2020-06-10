/* global chrome */ 

class CardModel{
  // Card cần có tiêu đề, và nếu toàn bộ item trong Card đó done thì completed cũng được chuyển thành done để filter sau này
  constructor(id, title) {
    this.name = 'Card';
    this.id = id;
    this.title = title;
    // this.completed = completed;
    // this.show = show;
  };
  // class methods (static)
  // load toàn bộ dữ liệu
  static all() {
    chrome.storage.sync.get(this.id, function (data) {
      console.log(data);
    });
  }

  //where với query
  static where() {
  }

  //find first
  static find(query) {
    return CardModel.where(query)[0];
  }
  // Instance methods

  create() {};

  save() {
    let obj = {
      title: this.title
    };
    
    chrome.storage.sync.set({[this.id]: JSON.stringify(obj)}, function() {
      chrome.storage.sync.get(this.id, function (data) {
        console.log(data);
      });
    });
  };

  delete() {
    chrome.storage.sync.get(function(Items) {
      chrome.storage.sync.remove(Object.keys(Items))
    });
  };

  toggle() {
    this.show = !this.show;
  };
};

export default CardModel;
