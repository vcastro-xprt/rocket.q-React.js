import "./modal.css";
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

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
  const { user } = useAuth();
  const requiresPassword = user?.role !== "admin";

  if (!isModalOpen) return null;

  const modalConfig = {
    check: {
      title: "Marcar como lida esta pergunta?",
      description: "Tem certeza que deseja marcar como lida esta pergunta?",
      confirmLabel: "Sim, marcar como lida",
      color: "",
      showQuestionPreview: true,
    },
    delete: {
      title: "Excluir esta pergunta?",
      description: "Tem certeza que deseja excluir esta pergunta?",
      confirmLabel: "Sim, excluir",
      color: "red",
      showQuestionPreview: true,
    },
    deleteRoom: {
      title: "Excluir esta sala?",
      description:
        "Tem certeza que deseja excluir esta sala?\nTodas as perguntas também serão removidas.",
      confirmLabel: "Sim, excluir",
      color: "red",
      showQuestionPreview: false,
    },
  };

  const { title, description, confirmLabel, color, showQuestionPreview } =
    modalConfig[modalType] || modalConfig.delete;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = inputPassword.current?.value?.trim() || "";

    if (requiresPassword && !password) {
      setError("Por favor, digite a senha da sala");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onConfirm(password);
      // Reset form
      if (inputPassword.current) {
        inputPassword.current.value = "";
      }
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
        <h2>{title}</h2>
        <p>{description}</p>

        {showQuestionPreview && selectedQuestion && (
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
          {requiresPassword && (
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              ref={inputPassword}
              disabled={loading}
            />
          )}

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
              {loading ? "Processando..." : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
