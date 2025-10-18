import "./home.css";

function Home() {
  return (
    <div className="home">
      <header>
        <a href="/">
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </a>
      </header>
      <div id="bg">
        <div className="ball top"></div>
        <div className="ball bottom"></div>
      </div>
      <main>
        <div className="container">
          <section>
            <h2>Entre como participante</h2>
            <form>
              <label htmlFor="room-id" className="sr-only">
                Código da sala
              </label>
              <input
                name="roomId"
                type="number"
                id="room-id"
                placeholder="Código da sala"
              />
              <button>
                <img src="/images/enter-room.svg" alt="Entar na Sala" />
                Entrar na Sala
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
            <a href="/create-pass" className="button outlined">
              <img src="/images/users.svg" alt="Criar Sala" />
              Criar Sala
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
