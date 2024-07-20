import { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";

function Form() {
  const newTask = useRef("");
  const STORAGE = "TODOLIST_APP";

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("TODOLIST_APP")) || [];
  });
  const [taskCompleted, setTaskCompleted] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(tasks));
    const completed = tasks.filter((item) => item.completed === true);
    setTaskCompleted(completed.length);
  }, [tasks]);

  function setId() {
    if (tasks.length == 0) {
      return 1;
    } else {
      return tasks[0].id + 1;
    }
  }

  function addTask(e) {
    e.preventDefault();

    const taskValue = newTask.current.value.trim();

    if (taskValue == "") {
      alert("Tidak boleh kosong");
      newTask.current.value = "";
      return false;
    }

    const data = {
      id: setId(),
      task: taskValue,
      completed: false,
    };

    setTasks([...tasks, data]);

    newTask.current.value = "";
  }

  function setCompleted(id) {
    const updateTask = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });
    setTasks(updateTask);
  }

  function move(currentIndex, updataIndex) {
    const currentData = tasks[currentIndex];
    const updateData = tasks[updataIndex];

    tasks[currentIndex] = {
      ...currentData,
      id: updateData.id,
    };

    tasks[updataIndex] = {
      ...updateData,
      id: currentData.id,
    };

    setTasks([...tasks]);
  }

  function remove(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((item) => item.id !== id));
    }
  }

  return (
    <>
      <div className="wrapper">
        <header>
          <h3>🔰 TODOLIST </h3>
          <span>
            {taskCompleted} / {tasks.length}
          </span>
        </header>

        <form className="input-box" onSubmit={addTask}>
          <input type="text" ref={newTask} placeholder="Add Your Task" />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <ToDoList
        tasks={tasks}
        setCompleted={setCompleted}
        move={move}
        remove={remove}
      />
    </>
  );
}

export default Form;
