import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
  constructor(data, selector) {
    if (data.id === undefined) {
      this._id = uuidv4();
    } else {
      this._id = data.id;
    }
    this._template = selector;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._initializeElement();
  }
  _initializeElement() {
    //Getting the eles/seles for the todo block
    this._todoEle = this._template.content
      .querySelector(".todo")
      .cloneNode(true);
    this._nameEle = this._todoEle.querySelector(".todo__name");
    this._checkboxEle = this._todoEle.querySelector(".todo__completed");
    this._labelEle = this._todoEle.querySelector(".todo__label");
    this._dateEle = this._todoEle.querySelector(".todo__date");
    this._deleteBtn = this._todoEle.querySelector(".todo__delete-btn");
    //Setting element attributes
    this._nameEle.textContent = this._name;
    this._checkboxEle.checked = this._completed;
    this._checkboxEle.id = `todo-${this._id}`;
    this._labelEle.setAttribute("for", `todo-${this._id}`);
    //Changing Date Format
    this._dueDate = new Date(this._date);
    if (!isNaN(this._dueDate)) {
      this._dateEle.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      )}`;
    }
    this._setEventListeners();
  }
  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._todoEle.remove();
    });
  }
  getView() {
    return this._todoEle;
  }
}

export { Todo };
