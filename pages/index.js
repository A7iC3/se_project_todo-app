import {
  initialTodos,
  validationConfig,
  todosList,
} from "../utils/constants.js";
import { PopupWithForm } from "../components/Popup.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const TaskCounter = new TodoCounter(initialTodos, ".counter__text");
const addTodoPopup = new PopupWithForm("#add-todo-popup", ({ name, date }) => {
  if (todoFormValidator.checkSubmit()) {
    // Create a date object and adjust for timezone
    const formattedDate = new Date(date);
    formattedDate.setMinutes(
      formattedDate.getMinutes() + formattedDate.getTimezoneOffset()
    );

    const values = { name, date: formattedDate };
    renderTodo(values, "#todo-template");
    TaskCounter.updateTotal(true);
    todoFormValidator.resetValidation();
  }
});
addTodoPopup.setEventListeners();

const renderTodo = (dataObj, templateSele) => {
  const _todo = new Todo(dataObj, templateSele, {
    updateCompleted: (increment) => {
      TaskCounter.updateCompleted(increment);
    },
    updateTotal: (increment) => {
      TaskCounter.updateTotal(increment);
    },
  }).getView();
  todosList.append(_todo);
};

document.addEventListener("keydown", (event) => {
  addTodoPopup._handleEscapeClose(event);
});

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

initialTodos.forEach((item) => {
  renderTodo(item, "#todo-template");
});

const todoFormValidator = new FormValidator(
  validationConfig,
  addTodoPopup._form
);
todoFormValidator.enableValidation();
