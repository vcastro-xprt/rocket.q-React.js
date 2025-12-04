import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/api";
import "../Home/home.css";
import { useAuth } from "../../contexts/AuthContext";

function CreatePass() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputCreatePass = useRef();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const password = inputCreatePass.current.value.trim();

    if (!password) {
      setError("Por favor, insira uma senha");
      return;
    }

    if (password.length < 3) {
      setError("A senha deve ter pelo menos 3 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await ApiService.createRoom(password);
      navigate(`/room/${response.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
      setError(error.message || "Erro ao criar sala");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <Link to="/">
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
        <button
          type="button"
          className="button outlined"
          onClick={logout}
          style={{ width: "auto", padding: "0 2rem" }}
        >
          Sair
        </button>
      </header>
      <div className="home">
        <div id="bg">
          <div className="ball top"></div>
          <div className="ball bottom"></div>
        </div>
        <main>
          <section className="container">
            <h2>Crie sua própria sala</h2>
            <form onSubmit={handleCreateRoom}>
              <label htmlFor="room-pass" className="sr-only">
                Insira uma senha
              </label>
              <input
                type="password"
                name="password"
                id="room-pass"
                placeholder="Insira uma senha"
                ref={inputCreatePass}
                disabled={loading}
                minLength={3}
              />
              {error && (
                <p
                  style={{
                    color: "var(--red)",
                    fontSize: "1.4rem",
                    marginBottom: "1rem",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {error}
                </p>
              )}
              <button type="submit" disabled={loading}>
                <img src="/images/users-white.svg" alt="Criar Sala" />
                {loading ? "Criando..." : "Criar sala"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}

export default CreatePass;
