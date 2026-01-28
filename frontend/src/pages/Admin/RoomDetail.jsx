import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ApiService from "../../services/api";
import "./admin.css";

function AdminRoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const data = await ApiService.adminGetRoom(id);
        setRoom(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar sala");
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="admin-page">
        <div className="admin-header">
          <h2>Detalhes da sala</h2>
          <Link to="/admin/rooms" className="button outlined">
            Voltar
          </Link>
        </div>

        {error && <p style={{ color: "var(--red)" }}>{error}</p>}

        {loading ? (
          <p>Carregando...</p>
        ) : room ? (
          <div className="admin-card">
            <p>
              <strong>ID:</strong> {room.id}
            </p>
            <p>
              <strong>Dono:</strong> {room.owner?.email || "-"}
            </p>
            <p>
              <strong>Quantidade de perguntas:</strong>{" "}
              {room.questions?.length || 0}
            </p>

            <h3 style={{ marginTop: "2rem" }}>Perguntas</h3>
            {room.questions?.length ? (
              <ul style={{ marginTop: "1rem" }}>
                {room.questions.map((question) => (
                  <li key={question.id} style={{ marginBottom: "1rem" }}>
                    <strong>#{question.id}</strong> {question.text} -{" "}
                    {question.isRead ? "Lida" : "Não lida"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma pergunta.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminRoomDetail;
