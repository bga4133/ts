import React, { Fragment, useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string): void => {
    const newTaks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTaks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setNewTask(e.target.value)}
          value={newTask}
          ref={taskInput}
        />
        <button>save</button>
      </form>
      {tasks.map((t: ITask, i: number) => (
        <div key={i}>
          <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
            {t.name}
          </h2>
          <div>
            <button onClick={() => toggleDoneTask(i)}>
              {t.done ? "✓" : "✗"}
            </button>
            <button onClick={() => removeTask(i)}>🗑</button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default App;
