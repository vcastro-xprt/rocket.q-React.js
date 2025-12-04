import "./auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha email e senha");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header>
          <img src="/images/logo.svg" alt="Rocket.Q logo" />
          <Link to="/login" className="button outlined">
            Entrar
          </Link>
        </header>
        <div>
          <h2>Criar conta</h2>
          <p style={{ color: "var(--gray-dark)", marginTop: ".4rem" }}>
            Comece a usar o Rocket.Q
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={loading}
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            disabled={loading}
          />

          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repita a senha"
            disabled={loading}
          />

          {error && <p className="error">{error}</p>}

          <div className="actions">
            <Link to="/login">Já tem conta? Entre</Link>
            <button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
