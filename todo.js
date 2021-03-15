"use strict";
class Todo {
  constructor() {
    // 登録ボタン
    this.addTaskTrigger = document.querySelector("#js-addTask-trigger");
    // リスト
    this.addTaskTarget = document.querySelector("#js-addTask-target");
    // インプット
    this.addTaskValue = document.querySelector("#js-addTask-value");
    // フォーム
    this.form = document.querySelector("#js-form");
    // Todo数
    this.todoCount = document.querySelector("#todo-count");
    this.count = 0;
    this.todoCount.innerHTML = `Todo:${this.count}`;
    this._init();
  }
  // 削除ボタンを押した時の動き
  _removeTask(removeButton) {
    const targetTask = removeButton.closest("li");
    this.addTaskTarget.removeChild(targetTask);
    //   todoCountの数を引く
    this.count = this.count - 1;
    this.todoCount.innerHTML = `Todo:${this.count}`;
  }
  // 完了ボタンを押した時の動き
  _completeTask(completeButton) {
    const targetTask = completeButton.closest("li");
    targetTask.classList.toggle("isComplete");
  }
  // タスクが追加された時の動き
  _addTask(task) {
    const listItem = document.createElement("li");
    const removeButton = document.createElement("button");
    const completeButton = document.createElement("input");
    //   削除ボタン
    removeButton.innerHTML = "X";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", () => {
      this._removeTask(removeButton);
    });
    // 完了ボタン
    completeButton.setAttribute("type", "checkbox");
    completeButton.addEventListener("click", () =>
      this._completeTask(completeButton)
    );
    // liの中身
    listItem.innerHTML = task;
    listItem.prepend(completeButton);
    listItem.appendChild(removeButton);
    //   ulに追加
    this.addTaskTarget.appendChild(listItem);
  }
  _addEvent(trigger, type) {
    trigger.addEventListener(type, (event) => {
      if (type === "submit") {
        // イベントタイプがENTERの時は本来の動きをなくす
        event.preventDefault();
        const task = this.addTaskValue.value;
        this._addTask(task);
        this.addTaskValue.value = "";
        //   todoCountの数を足す
        this.count = this.count + 1;
        this.todoCount.innerHTML = `Todo:${this.count}`;
      } else {
        const task = this.addTaskValue.value;
        this._addTask(task);
        this.addTaskValue.value = "";
        //   todoCountの数を足す
        this.count = this.count + 1;
        this.todoCount.innerHTML = `Todo:${this.count}`;
      }
    });
  }
  _init() {
    // クリックした時に追加する
    this._addEvent(this.addTaskTrigger, "click");
    // ENTERで追加する
    this._addEvent(this.form, "submit");
  }
}
new Todo();
