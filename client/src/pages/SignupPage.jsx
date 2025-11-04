import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./SignupPage.css"

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
        
            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="container">
    <h1>Create Account</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Username</label>
      <input type="text" id="name" name="name" onChange={(e) => setUsername(e.target.value)} required />
      <br />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Sign Up</button>
    </form>

    <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default SignupPage