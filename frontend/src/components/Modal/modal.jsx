import "./modal.css";
import { useState, useRef } from "react";

function Modal({
  isModalOpen,
  closeModal,
  modalType,
  selectedQuestion,
  onConfirm,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputPassword = useRef();

  if (!isModalOpen) return null;

  const text = modalType === "check" ? "Marcar como lida" : "Excluir";
  const color = modalType === "check" ? "" : "red";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = inputPassword.current.value.trim();

    if (!password) {
      setError("Por favor, digite a senha da sala");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onConfirm(password);
      // Reset form
      inputPassword.current.value = "";
    } catch (error) {
      console.error("Error in modal action:", error);
      setError(error.message || "Senha incorreta");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    setLoading(false);
    if (inputPassword.current) {
      inputPassword.current.value = "";
    }
    closeModal();
  };

  return (
    <div className="modal-wrapper" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{`${text} esta pergunta?`}</h2>
        <p>{`Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`}</p>

        {selectedQuestion && (
          <div
            style={{
              backgroundColor: "var(--light-blue)",
              padding: "1rem",
              borderRadius: "0.8rem",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "1.4rem",
                color: "var(--gray-dark)",
                lineHeight: "1.6",
              }}
            >
              "{selectedQuestion.text}"
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="sr-only">
            Digite sua senha admin
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            ref={inputPassword}
            disabled={loading}
          />

          {error && (
            <p
              style={{
                color: "var(--red)",
                fontSize: "1.4rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <div className="buttons">
            <button
              type="button"
              onClick={handleClose}
              className="button gray cancel"
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className={color} disabled={loading}>
              {loading ? "Processando..." : `Sim, ${text.toLowerCase()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
