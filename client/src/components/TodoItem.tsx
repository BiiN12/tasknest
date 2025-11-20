import { XIcon } from "lucide-react";
import * as api from "../services/api";
import "./TodoItem.css";

function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: { id: string | number; title: string; completed?: boolean };
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="todo">
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span className={todo.completed ? "todo-completed" : ""}>
        {todo.title}
      </span>
      <button onClick={onDelete}>
        <XIcon size={16} />
      </button>
    </div>
  );
}

export default TodoItem;
