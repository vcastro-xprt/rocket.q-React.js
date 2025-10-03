import { useState } from "react";

function EnterRoom() {

  const [inputValue, setInputValue] = useState()


  const handleEntrarSala = () => {
    window.location = `/room?rommId=${inputValue}`
  }


  return (
    <>
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
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <button onClick={handleEntrarSala}>
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
    </>
  );
}

export default EnterRoom;

