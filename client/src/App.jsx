import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
