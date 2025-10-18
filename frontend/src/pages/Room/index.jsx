import "./room.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal/modal";
import QuestionCards from "../../components/Question-cards/questions";

function Room() {
  // FECHA A MODAL
  const textAreaQuestion = useRef();

  const [isModalOpen, SetisModalOpen] = useState(false);

  function closeModal() {
    SetisModalOpen(false);
  }

  // ABRE A MODAL E LIDA COM OS TEXTOS DA MODAL

  const [ModalType, SetModalType] = useState(null);

  function openModal(type) {
    SetisModalOpen(true);
    SetModalType(type);
  }

  // DEFINE SE A QUESTÃO FOI LIDA OU NÃO

  const [isRead, SetIsRead] = useState(false);

  function markedAsRead() {
    SetIsRead(true);
  }

  return (
    <>
      <div className="content" id="room">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>
          <div className="buttons">
            <div className="button outlined" id="room-id" data-id="334254">
              <img src="/images/copy.svg" alt="Copiar número da sala" />
            </div>
            <a href="/create-pass" className="button">
              <img src="/images/users-white.svg" alt="Criar uma sala" />
              Criar Sala
            </a>
          </div>
        </header>

        <main id="question-form">
          <section>
            <h2>Faça sua pergunta</h2>
            <form action="/question/create/" method="POST">
              <label for="question" className="sr-only">
                O que você quer perguntar?
              </label>
              <textarea
                name="question"
                id="question"
                placeholder="O que você quer perguntar ?"
                ref={textAreaQuestion}
              ></textarea>

              <footer>
                <div>
                  <img src="/images/lock.svg" alt="Cadeado" />
                  Esta pergunta é anônima
                </div>
                <button>Enviar</button>
              </footer>
            </form>
          </section>
          <QuestionCards openModal={openModal}  isRead={isRead}/>
        </main>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        ModalType={ModalType}
        markedAsRead={markedAsRead}
          isRead={isRead}
      />
    </>
  );
}

export default Room;
