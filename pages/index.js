import {
  initialTodos,
  validationConfig,
  todosList,
} from "../utils/constants.js";
import { PopupWithForm } from "../components/Popup.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const taskCounter = new TodoCounter(initialTodos, ".counter__text");
const addTodoPopup = new PopupWithForm("#add-todo-popup", ({ name, date }) => {
  if (todoFormValidator.checkSubmit()) {
    // Create a date object and adjust for timezone
    const formattedDate = new Date(date);
    formattedDate.setMinutes(
      formattedDate.getMinutes() + formattedDate.getTimezoneOffset()
    );

    const values = { name, date: formattedDate };
    renderTodo(values, "#todo-template");
    taskCounter.updateTotal(true);
    todoFormValidator.resetValidation();
  }
});
addTodoPopup.setEventListeners();

const renderTodo = (dataObj, templateSelector = "#todo-template") => {
  const _todo = new Todo(dataObj, templateSelector, {
    updateCompleted: (increment) => {
      taskCounter.updateCompleted(increment);
    },
    updateTotal: (increment) => {
      taskCounter.updateTotal(increment);
    },
  }).getView();
  TaskSection.addItem(_todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoFormValidator = new FormValidator(
  validationConfig,
  addTodoPopup.formElement
);
todoFormValidator.enableValidation();

const TaskSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
TaskSection.renderItems();
