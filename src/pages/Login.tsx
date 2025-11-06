import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../backend/client-supabase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
      setUser(null);
    } else {
      setError("");
      setUser(data.user);
      const newUser = data.user
      console.log(newUser);
    }
    setLoading(false);
  };

  const handleLoginWithGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
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
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {loading ? "Logging in..." : "Login"}
      </button>
      <button
        type="button"
        onClick={handleLoginWithGoogle}
        disabled={googleLoading || loading}
        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaGoogle size={20} color="#4285F4" />
        {googleLoading ? "Connecting..." : "Continue with Google"}
      </button>
      <span className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}
    </form>
    </div>
  )
}
