import "./modal.css";
import { useState, useRef } from "react";

function Modal({ isModalOpen, closeModal, ModalType}) {
  const inputPassword = useRef();
  const text = ModalType === "check" ? "Marcar como lida" : "Excluir"
  const color = ModalType === "check" ? "" : "red"
  if (!isModalOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2>{`${text} esta pergunta ?`}</h2>
        <p>{`Tem certeza que deseja ${text.toLocaleLowerCase()} esta \n pergunta ?`}</p>

        <form action="" method="POST">
          <label htmlFor="password" className="sr-only">
            Digite sua senha admim
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            ref={inputPassword}
          />

          <div className="buttons">
            <div onClick={closeModal} className="button gray cancel">
              Cancelar
            </div>
            <button className={color}>{`Sim, ${text.toLocaleLowerCase()}`}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
