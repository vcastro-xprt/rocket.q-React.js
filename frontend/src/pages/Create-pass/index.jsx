import { useState, useRef } from "react";
import "../Home/home.css";

function CreatePass() {
 
  const inputCreatePass = useRef()

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
        <section>
          <h2>Crie sua própria sala</h2>
          <form action="/room">
            <label htmlFor="room-pass" className="sr-only">
              Insira uma senha
            </label>
            <input
              type="password"
              name="password"
              id="room-pass"
              placeholder="Insira uma senha"
              ref={inputCreatePass}
            />
            <button>
              <img src="/images/users-white.svg" alt="Entar na Sala" />
              Criar sala
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default CreatePass;
