import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../backend/client-supabase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    
    error ? setError(error.message) : setError("");
    setLoading(false);
  };

  return (
  <div className="flex flex-col items-center justify-center h-screen">
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="border border-gray-300 rounded-md p-2"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="border border-gray-300 rounded-md p-2"
      />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded-md">Login</button>
      <span className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-blue-500">Loading...</p>}
      </form>
    </div>
  )
}
