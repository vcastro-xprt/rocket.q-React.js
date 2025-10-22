import "./room.css";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../../components/Modal/modal";
import QuestionCards from "../../components/Question-cards/questions";
import ApiService from "../../services/api";

function Room() {
  const { roomId } = useParams();
  const textAreaQuestion = useRef();

  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roomExists, setRoomExists] = useState(false);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  // Load room data on component mount
  useEffect(() => {
    const loadRoomData = async () => {
      try {
        setLoading(true);
        const roomData = await ApiService.getRoomDetails(roomId);
        setQuestions(roomData.questions || []);
        setRoomExists(true);
      } catch (error) {
        console.error("Error loading room:", error);
        setError("Sala não encontrada");
        setRoomExists(false);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      loadRoomData();
    }
  }, [roomId]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    // You could add a toast notification here
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const questionText = textAreaQuestion.current.value.trim();

    if (!questionText) {
      return;
    }

    setSubmittingQuestion(true);

    try {
      const newQuestion = await ApiService.createQuestion(questionText, roomId);
      setQuestions((prev) => [newQuestion, ...prev]);
      textAreaQuestion.current.value = "";
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Erro ao enviar pergunta");
    } finally {
      setSubmittingQuestion(false);
    }
  };

  const openModal = (type, question = null) => {
    setModalType(type);
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedQuestion(null);
  };

  const handleQuestionAction = async (password) => {
    if (!selectedQuestion) return;

    try {
      if (modalType === "check") {
        await ApiService.markQuestionAsRead(selectedQuestion.id, password);
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === selectedQuestion.id ? { ...q, isRead: true } : q
          )
        );
      } else if (modalType === "delete") {
        await ApiService.deleteQuestion(selectedQuestion.id, password);
        setQuestions((prev) =>
          prev.filter((q) => q.id !== selectedQuestion.id)
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error performing action:", error);
      throw error; // Re-throw to be handled by Modal component
    }
  };

  if (loading) {
    return (
      <div id="room">
        <header>
          <Link to="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </Link>
        </header>
        <main style={{ textAlign: "center", marginTop: "5rem" }}>
          <p>Carregando sala...</p>
        </main>
      </div>
    );
  }

  if (!roomExists) {
    return (
      <div id="room">
        <header>
          <Link to="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </Link>
        </header>
        <main style={{ textAlign: "center", marginTop: "5rem" }}>
          <p
            style={{
              color: "var(--red)",
              fontSize: "1.8rem",
              marginBottom: "2rem",
            }}
          >
            {error}
          </p>
          <Link to="/" className="button">
            Voltar ao início
          </Link>
        </main>
      </div>
    );
  }

  return (
    <>
      <div id="room">
        <header>
          <Link to="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </Link>
          <div className="buttons">
            <div
              className="button outlined"
              id="room-id"
              onClick={copyRoomId}
              style={{ cursor: "pointer" }}
              title="Clique para copiar o código da sala"
            >
              #{roomId}
              <img src="/images/copy.svg" alt="Copiar número da sala" />
            </div>
            <Link to="/create-pass" className="button">
              <img src="/images/users-white.svg" alt="Criar uma sala" />
              Criar Sala
            </Link>
          </div>
        </header>

        <main id="question-form">
          <section>
            <h2>Faça sua pergunta</h2>
            <form onSubmit={handleSubmitQuestion}>
              <label htmlFor="question" className="sr-only">
                O que você quer perguntar?
              </label>
              <textarea
                name="question"
                id="question"
                placeholder="O que você quer perguntar ?"
                ref={textAreaQuestion}
                disabled={submittingQuestion}
              />

              <footer>
                <div>
                  <img src="/images/lock.svg" alt="Cadeado" />
                  Esta pergunta é anônima
                </div>
                <button type="submit" disabled={submittingQuestion}>
                  {submittingQuestion ? "Enviando..." : "Enviar"}
                </button>
              </footer>
            </form>
          </section>

          <QuestionCards questions={questions} openModal={openModal} />
        </main>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        selectedQuestion={selectedQuestion}
        onConfirm={handleQuestionAction}
      />
    </>
  );
}

export default Room;
