import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import logo from "/prismavitae.png";
import "./Login.css";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");

    if (token && type === "signup") {
      setStatus("success");
      setMessage("Email confirmado exitosamente. Tu cuenta está pendiente de aprobación por un administrador.");
    } else {
      setStatus("error");
      setMessage("Link de confirmación inválido o expirado.");
    }
  }, [searchParams]);

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
        <div className="form" style={{ textAlign: "center", padding: "40px" }}>
          <img src={logo} alt="PrismaVitae" />
          <h3 style={{ margin: "20px 0 10px" }}>
            {status === "loading" && "Confirmando email..."}
            {status === "success" && "Email Confirmado"}
            {status === "error" && "Error"}
          </h3>
          <p style={{ color: "#666", marginBottom: "30px" }}>{message}</p>
          {status !== "loading" && (
            <Link to="/" style={{
              display: "inline-block",
              padding: "12px 30px",
              background: "#6750A4",
              color: "white",
              borderRadius: "20px",
              textDecoration: "none",
              fontWeight: "bold"
            }}>
              Ir al Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
