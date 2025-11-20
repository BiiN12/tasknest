import { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import TodoInput from '../components/TodoInput'
import * as api from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { LogOutIcon } from 'lucide-react'
import './TodoPage.css'

function TodoPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await api.getTodos();
        setTodos(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchTodos();
  }, []);

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }


  return (
    <div className='todo-page'>
      <div className='nav'>
        <div className='left'>
          <p className='welcome'>Welcome Back,</p>
          <p className='name'>{user.username}</p>
        </div>
        <button onClick={logout}>
          <LogOutIcon size={16}/><span>Logout</span>
        </button>
      </div>
      <div className='todo-container'>
          <h1>Todos</h1>
          <div className="todo-input">
            <TodoInput />
          </div>

          <div className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={() => api.toggleTodo(todo.id, !todo.completed)} onDelete={() => api.deleteTodo(todo.id)} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default TodoPage