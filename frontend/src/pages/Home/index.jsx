import EnterRoom from "../../components/enter-room";
import "./home.css";

function Home() {
  return (
    <div id="home" className="content">
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
          <EnterRoom  />
        </div>
      </main>
    </div>
  );
}

export default Home;
