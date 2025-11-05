import { supabase } from "../supabase/supabase-client";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
    else setUser(data.user);
  }

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) alert(error.message);
    else alert("Registro exitoso, revisa tu correo para confirmar la cuenta");
    console.log(data);
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) console.error("Error al iniciar sesión con Google:", error);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {!user ? (
        <>
          <h2>🔐 Login con Supabase</h2>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin} disabled={loading}>
            Iniciar sesión
          </button>
          <button onClick={handleSignUp} disabled={loading}>
            Registrarse
          </button>
          <button onClick={handleGoogleLogin} disabled={loading}>
            Google
          </button>
        </>
      ) : (
        <>
          <h2>Bienvenido {user.email}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
}
