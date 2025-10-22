import "./home.css";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const roomIdRef = useRef();
  const navigate = useNavigate();

  const handleEnterRoom = async (e) => {
    e.preventDefault();
    const roomId = roomIdRef.current.value.trim();

    if (!roomId) {
      setError("Por favor, insira o código da sala");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Just navigate to the room, password will be checked there
      navigate(`/room/${roomId}`);
    } catch {
      setError("Erro ao entrar na sala");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header>
        <Link to="/">
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
      </header>
      <div id="bg">
        <div className="ball top"></div>
        <div className="ball bottom"></div>
      </div>
      <main>
        <div className="container">
          <section>
            <h2>Entre como participante</h2>
            <form onSubmit={handleEnterRoom}>
              <label htmlFor="room-id" className="sr-only">
                Código da sala
              </label>
              <input
                ref={roomIdRef}
                name="roomId"
                type="number"
                id="room-id"
                placeholder="Código da sala"
                disabled={loading}
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
                <img src="/images/enter-room.svg" alt="Entrar na Sala" />
                {loading ? "Entrando..." : "Entrar na Sala"}
              </button>
            </form>

            <div className="separator">
              <div></div>
              <div>ou</div>
              <div></div>
            </div>
          </section>
          <section>
            <h2>Crie sua própria sala, de forma fácil</h2>
            <Link to="/create-pass" className="button outlined">
              <img src="/images/users.svg" alt="Criar Sala" />
              Criar Sala
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
