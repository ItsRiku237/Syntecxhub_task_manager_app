import { LogOut, ListTodo } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand" aria-label="Task Manager home">
        <ListTodo size={24} />
        <span>Task Manager</span>
      </Link>

      <nav className="nav-actions" aria-label="Primary navigation">
        {isAuthenticated ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button className="icon-text-button" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
