import { useState } from "react"
import * as api from '../services/api'
import { PlusIcon } from "lucide-react";
import "./TodoInput.css"

function TodoInput() {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createTodo({ title: task });
            setTask('');
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new task" onChange={(e) => setTask(e.target.value)}/>
      <button type="submit">
        <PlusIcon size={16} />
      </button>
    </form>
  )
}

export default TodoInput