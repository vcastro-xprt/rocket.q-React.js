import "./room.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal/modal";

function Room() {
  // FECHA A MODAL
  const textAreaQuestion = useRef();

  const [isModalOpen, SetisModalOpen] = useState(false);

  function closeModal() {
    SetisModalOpen(false);
  }

  // ABRE A MODAL E LIDA COM OS TEXTOS DA MODAL

  const [ModalType, SetModalType] = useState (null)

    function openModal(type){
      SetisModalOpen(true)
      SetModalType(type)
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

          <section id="question">
            <h2 className="sr-only">Perguntas da comunidade</h2>
            <div className="questions">
              <div className="question-wrapper">
                <div className="question-content">
                  <div className="user">
                    <img src="/images/1user.svg" alt="Avatar" />
                  </div>
                  <div className="question">
                    <p> </p>
                  </div>
                </div>

                <div className="actions">
                  <a href="#" className="check" data-id="" onClick={() => openModal("check")}>
                    <img src="/images/check.svg" alt="Marcar como lida" />
                    Marcar como lida
                  </a>
                  <a href="#" className="delete" data-id="" onClick={() => openModal("delete")}>
                    <img src="/images/trash.svg" alt="Excluir" />
                    Excluir
                  </a>
                </div>
              </div>

              <div className="question-wrapper read">
                <div className="question-content">
                  <div className="user">
                    <img src="/images/1user.svg" alt="Avatar/" />
                  </div>
                  <div className="question">
                    <p></p>
                  </div>
                </div>

                <div className="actions">
                  <p className="marked">
                    <img src="/images/check.svg" alt="" />
                    Pergunta lida
                  </p>

                  <a href="#" className="delete" data-id="" onClick={() => openModal("delete")}>
                    <img src="/images/trash.svg" alt="Excluir" />
                    Excluir
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Modal isModalOpen={isModalOpen} closeModal={closeModal} ModalType={ModalType}/>
    </>
  );
}

export default Room;
