/* eslint-disable react/prop-types */
function ToDoListButton({ id, tasks, move, remove }) {
  const currentIndex = tasks.findIndex((item) => item.id === id);
  let previousIndex = currentIndex - 1;
  let nextIndex = currentIndex + 1;

  let prevButton = "";
  if (tasks[previousIndex]) {
    prevButton = "👆";
  } else {
    previousIndex = "";
  }

  let nextButton = "";
  if (tasks[nextIndex]) {
    nextButton = "👇";
  } else {
    nextIndex = "";
  }

  return (
    <>
      <span>
        <button onClick={() => move(currentIndex, previousIndex)}>
          {prevButton}
        </button>
      </span>
      <span>
        <button onClick={() => move(currentIndex, nextIndex)}>
          {nextButton}
        </button>
      </span>
      <span>
        <button onClick={() => remove(id)}>🗑️</button>
      </span>
    </>
  );
}

export default ToDoListButton;
