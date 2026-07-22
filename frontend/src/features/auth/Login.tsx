import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import logo from "/prismavitae.png";
import google from "/google.svg";
import facebook from "/facebook.svg";
import eye from "/eye.svg";
import eyeOff from "/eye-off.svg";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/app");
      }
    };
    checkSession();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`
      }
    });
    if (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/app");
    }
    setLoading(false);
  };

  return (
    <section className="login-section">
      <div className="card">
        <div className="hero">
          <div className="prism-container">
            <div className="light-ray"></div>
            <div className="light-ray"></div>
            <div className="light-ray"></div>
            <div className="light-ray"></div>
            <div className="light-ray"></div>
            <div className="light-ray"></div>
            <div className="color-ray"></div>
            <div className="color-ray"></div>
            <div className="color-ray"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        <form className="form" onSubmit={handleEmailLogin}>
          <img src={logo} alt="PrismaVitae" />
          <h3>Iniciar sesión en tu cuenta</h3>
          <div className="socials">
            <button type="button" className="social-btn" onClick={handleGoogleLogin}>
              <img src={google} alt="Google" />
              <p>
                <span className="extra-text">Iniciar sesión con</span> Google
              </p>
            </button>
            <button type="button" className="social-btn">
              <img src={facebook} alt="Facebook" />
              <p>
                <span className="extra-text">Iniciar sesión con</span> Facebook
              </p>
            </button>
          </div>
          <span className="or"></span>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? eyeOff : eye} alt="Toggle password" />
            </button>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </section>
  );
};
