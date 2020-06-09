class ItemModel {
  // Checklist cần có nội dung, và nếu toàn bộ item trong checklist đó done thì isCompleted cũng được chuyển thành done để filter sau này
  constructor(content, completed) {
    this.name = 'Item';
    this.content = content;
    this.completed = completed;
  };

  save = () => {
    
  };
};

export default ItemModel;
