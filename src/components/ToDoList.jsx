/* eslint-disable react/prop-types */
import ToDoListButton from "./ToDoListButton";

function ToDoList({ tasks, setCompleted, move, remove }) {
  tasks.sort((a, b) => b.id - a.id);

  return (
    <div className="wrapper">
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            <div className="left">
              <button onClick={() => setCompleted(item.id)}>
                {item.completed ? "✅" : "◻️"}
              </button>
            </div>
            <div className={`center ${item.completed && "strike"}`}>
              {item.task}
            </div>
            <div className="right">
              <ToDoListButton
                id={item.id}
                tasks={tasks}
                move={move}
                remove={remove}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
