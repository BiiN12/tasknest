import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Request interceptor - runs BEFORE every request
API.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  // If token exists, add it to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ============ AUTH API CALLS ============
export const register = (userData) => {
  return API.post("/auth/register", userData);
};

export const login = (userData) => {
  return API.post("/auth/login", userData);
};

// ============ TODO API CALLS ============
export const getTodos = () => {
  return API.get("/todos");
};

export const createTodo = (todoData) => {
  return API.post("/todos", todoData);
};

export const updateTodo = (id, todoData) => {
  return API.put(`/todos/${id}`, todoData);
};

export const deleteTodo = (id) => {
  return API.delete(`/todos/${id}`);
};

export const toggleTodo = (id, completed) => {
  return API.put(`/todos/${id}`, { completed });
};
