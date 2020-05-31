class Checklist {
  // Checklist cần có tiêu đề, và nếu toàn bộ item trong checklist đó done thì isCompleted cũng được chuyển thành done để filter sau này
  constructor(title, completed, show) {
    this.name = 'CheckList';
    this.title = title;
    this.completed = completed;
    this.show = show;
  };
  // Class methods (static)

  // load toàn bộ dữ liệu
  static all() {
    return [];
  }

  //where với query
  static where(query) {
    return [];
  }

  //find first
  static find(query) {
    return Checklist.where(query)[0];
  }
  // Instance methods

  create() {};

  update() {};

  delete() {};

  toggle() {
    this.show = !this.show;
  };
};

export default Checklist;
