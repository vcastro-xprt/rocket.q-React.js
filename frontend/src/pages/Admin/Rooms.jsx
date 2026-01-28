import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ApiService from "../../services/api";
import "./admin.css";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ password: "", userId: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ password: "", userId: "" });

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await ApiService.adminListRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar salas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        password: form.password,
        userId: form.userId ? Number(form.userId) : null,
      };
      await ApiService.adminCreateRoom(payload);
      setForm({ password: "", userId: "" });
      loadRooms();
    } catch (err) {
      setError(err.message || "Erro ao criar sala");
    }
  };

  const startEdit = (room) => {
    setEditingId(room.id);
    setEditForm({ password: "", userId: room.owner?.id || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ password: "", userId: "" });
  };

  const handleUpdate = async (id) => {
    setError("");
    try {
      const payload = {
        ...(editForm.password ? { password: editForm.password } : {}),
        userId: editForm.userId ? Number(editForm.userId) : null,
      };
      await ApiService.adminUpdateRoom(id, payload);
      cancelEdit();
      loadRooms();
    } catch (err) {
      setError(err.message || "Erro ao atualizar sala");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta sala?")) return;
    setError("");
    try {
      await ApiService.adminDeleteRoom(id);
      loadRooms();
    } catch (err) {
      setError(err.message || "Erro ao excluir sala");
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-page">
        <div className="admin-header">
          <h2>Gerenciar salas</h2>
        </div>

        {error && (
          <p style={{ color: "var(--red)", marginBottom: "1rem" }}>{error}</p>
        )}

        <div className="admin-card">
          <h3 style={{ marginBottom: "1rem" }}>Criar sala</h3>
          <form className="admin-form" onSubmit={handleCreate}>
            <input
              type="password"
              placeholder="Senha da sala"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="User ID (opcional)"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            />
            <button type="submit">Criar</button>
          </form>
        </div>

        <div className="admin-card">
          <h3 style={{ marginBottom: "1rem" }}>Lista de salas</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dono</th>
                  <th>Perguntas</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.owner ? room.owner.email : "-"}</td>
                    <td>{room.questionsCount}</td>
                    <td>
                      {editingId === room.id ? (
                        <div className="admin-actions">
                          <input
                            type="password"
                            placeholder="Nova senha (opcional)"
                            value={editForm.password}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                password: e.target.value,
                              })
                            }
                          />
                          <input
                            type="number"
                            placeholder="User ID (opcional)"
                            value={editForm.userId}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                userId: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdate(room.id)}
                          >
                            Salvar
                          </button>
                          <button
                            type="button"
                            className="button gray"
                            onClick={cancelEdit}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="admin-actions">
                          <Link
                            className="button outlined"
                            to={`/admin/rooms/${room.id}`}
                          >
                            Ver
                          </Link>
                          <button type="button" onClick={() => startEdit(room)}>
                            Editar
                          </button>
                          <button
                            type="button"
                            className="button red"
                            onClick={() => handleDelete(room.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRooms;
