import { todosList } from "../pages/index.js";

const taskCountHeader = document.querySelector(".counter__text");

const updateCounter = () => {
  const tasksY = Array.from(todosList.children).slice(1);
  const tasksX = tasksY.filter(
    (task) => task.querySelector(".todo__completed").checked
  );
  taskCountHeader.textContent = `Showing ${tasksX.length} out of ${tasksY.length} completed`;
};

export { updateCounter };
