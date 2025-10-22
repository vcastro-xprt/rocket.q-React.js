import "./questions.css";

function QuestionCards({ questions = [], openModal }) {
  if (questions.length === 0) {
    return (
      <section id="question">
        <h2 className="sr-only">Perguntas da comunidade</h2>
        <div className="no-questions">
          <img src="/images/noquestions.svg" alt="Nenhuma pergunta" />
          <p>Nenhuma pergunta por aqui...</p>
          <p>
            Faça sua primeira pergunta e envie o<br />
            código desta sala para outras pessoas!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="question">
      <h2 className="sr-only">Perguntas da comunidade</h2>
      <div className="questions">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`question-wrapper ${question.isRead ? "read" : ""}`}
          >
            <div className="question-content">
              <div className="user">
                <img src="/images/1user.svg" alt="Avatar" />
              </div>
              <div className="question">
                <p>{question.text}</p>
              </div>
            </div>

            <div className="actions">
              <button
                type="button"
                className="check"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("check", question);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--gray-dark)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
              >
                <img src="/images/check.svg" alt="Marcar como lida" />
                {question.isRead ? "Pergunta lida" : "Marcar como lida"}
              </button>

              <button
                type="button"
                className="delete"
                onClick={(e) => {
                  e.preventDefault();
                  openModal("delete", question);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--gray-dark)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  marginLeft: "2.4rem",
                }}
              >
                <img src="/images/trash.svg" alt="Excluir" />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuestionCards;
