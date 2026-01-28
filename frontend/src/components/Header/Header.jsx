import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./header.css";

function Header({ actions }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        <img src="/images/logo.svg" alt="Rocket.Q logo" />
      </Link>

      <div className="header-right">
        {actions && <div className="header-actions">{actions}</div>}

        {user && (
          <div className="header-menu">
            <button
              className="menu-trigger"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {user.email}
              <span aria-hidden="true">▾</span>
            </button>

            {menuOpen && (
              <div
                className="menu-dropdown"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link to="/account">Minha conta</Link>
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/users">Gerenciar usuários</Link>
                    <Link to="/admin/rooms">Gerenciar salas</Link>
                  </>
                )}
                <button type="button" onClick={handleLogout}>
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
