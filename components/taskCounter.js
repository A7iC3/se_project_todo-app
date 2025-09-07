import { todosList } from "../utils/constants.js";
const taskCountHeader = document.querySelector(".counter__text");

const updateCounter = () => {
  const _totalTasks = Array.from(todosList.children).slice(1);
  const _completedTasks = _totalTasks.filter(
    (task) => task.querySelector(".todo__completed").checked
  );
  taskCountHeader.textContent = `Showing ${_completedTasks.length} out of ${_totalTasks.length} completed`;
};

export { updateCounter };
