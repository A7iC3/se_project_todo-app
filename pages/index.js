import {
  initialTodos,
  validationConfig,
  todosList,
} from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { updateCounter } from "../components/taskCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const renderTodo = (dataObj, templateSele) => {
  const _todo = new Todo(dataObj, templateSele).getView();
  todosList.append(_todo);
  updateCounter();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (addTodoPopup.classList.contains("popup_visible")) {
      closeModal(addTodoPopup);
    }
  }
});

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (todoFormValidator.checkSubmit()) {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { name, date };
    renderTodo(values, "#todo-template");
    closeModal(addTodoPopup);
    todoFormValidator.resetValidation();
  }
});

initialTodos.forEach((item) => {
  renderTodo(item, "#todo-template");
});

const todoFormValidator = new FormValidator(validationConfig, addTodoForm);
todoFormValidator.enableValidation();
