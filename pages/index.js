import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._initializeElement();
  }

  _initializeElement() {
    //Getting the eles/seles for the todo block
    this._todoEle = todoTemplate.content.querySelector(".todo").cloneNode(true);
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

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = new Todo(values).getView();
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item).getView();
  todosList.append(todo);
});
