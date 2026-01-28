import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "../Home/home.css";

function NotFound() {
  return (
    <div className="home">
      <Header />
      <div id="bg">
        <div className="ball top"></div>
        <div className="ball bottom"></div>
      </div>
      <main>
        <div className="container">
          <section>
            <h2>Página não encontrada</h2>
            <p
              style={{
                marginBottom: "2rem",
                color: "var(--gray-dark)",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              A página que você está procurando não existe.
            </p>
            <Link to="/" className="button">
              <img src="/images/enter-room.svg" alt="Voltar ao início" />
              Voltar ao Início
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
