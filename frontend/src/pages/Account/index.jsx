import { useState } from "react";
import Header from "../../components/Header/Header";
import { useAuth } from "../../contexts/AuthContext";
import ApiService from "../../services/api";
import "../Auth/auth.css";

function Account() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    setLoading(true);
    try {
      await ApiService.updatePassword(currentPassword, newPassword);
      setMessage("Senha atualizada com sucesso");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page"
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Header />
      <div className="auth-card">
        <header>
          <div>
            <h2>Minha conta</h2>
            <p style={{ color: "var(--gray-dark)", marginTop: ".4rem" }}>
              Detalhes da conta
            </p>
          </div>
        </header>

        <div style={{ marginTop: "1.6rem" }}>
          <p style={{ fontSize: "1.4rem", color: "var(--gray-dark)" }}>
            Email: <strong>{user?.email}</strong>
          </p>
          <p style={{ fontSize: "1.4rem", color: "var(--gray-dark)" }}>
            Perfil: <strong>{user?.role === "admin" ? "Admin" : "User"}</strong>
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} style={{ marginTop: "2rem" }}>
          <label htmlFor="currentPassword">Senha atual</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Sua senha atual"
            disabled={loading}
          />

          <label htmlFor="newPassword">Nova senha</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            disabled={loading}
          />

          <label htmlFor="confirmPassword">Confirmar nova senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repita a nova senha"
            disabled={loading}
          />

          {error && <p className="error">{error}</p>}
          {message && (
            <p style={{ color: "var(--blue)", fontSize: "1.4rem" }}>
              {message}
            </p>
          )}

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
