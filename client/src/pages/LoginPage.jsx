import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./AuthPage.css"

function LoginPage() {
    const { login, user, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login({ email, password });

        if (!result.success) {
            setError(result.error);
        }
    };
  return (
    <div className="container">
    <h1>Welcome Back</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Login</button>
    </form>

    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

export default LoginPage