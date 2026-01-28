import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ApiService from "../../services/api";
import "./admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await ApiService.adminListUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await ApiService.adminCreateUser(form);
      setForm({ email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) {
      setError(err.message || "Erro ao criar usuário");
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ email: user.email, password: "", role: user.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ email: "", password: "", role: "user" });
  };

  const handleUpdate = async (id) => {
    setError("");
    try {
      const payload = { ...editForm };
      if (!payload.password) delete payload.password;
      await ApiService.adminUpdateUser(id, payload);
      cancelEdit();
      loadUsers();
    } catch (err) {
      setError(err.message || "Erro ao atualizar usuário");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;
    setError("");
    try {
      await ApiService.adminDeleteUser(id);
      loadUsers();
    } catch (err) {
      setError(err.message || "Erro ao excluir usuário");
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-page">
        <div className="admin-header">
          <h2>Gerenciar usuários</h2>
        </div>

        {error && (
          <p style={{ color: "var(--red)", marginBottom: "1rem" }}>{error}</p>
        )}

        <div className="admin-card">
          <h3 style={{ marginBottom: "1rem" }}>Criar usuário</h3>
          <form className="admin-form" onSubmit={handleCreate}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Criar</button>
          </form>
        </div>

        <div className="admin-card">
          <h3 style={{ marginBottom: "1rem" }}>Lista de usuários</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editingId === user.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingId === user.id ? (
                        <select
                          value={editForm.role}
                          onChange={(e) =>
                            setEditForm({ ...editForm, role: e.target.value })
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {editingId === user.id ? (
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
                          <button
                            type="button"
                            onClick={() => handleUpdate(user.id)}
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
                          <button type="button" onClick={() => startEdit(user)}>
                            Editar
                          </button>
                          <button
                            type="button"
                            className="button red"
                            onClick={() => handleDelete(user.id)}
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

export default AdminUsers;
