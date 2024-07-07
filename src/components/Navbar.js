import { useNavigate } from 'react-router-dom';

const Navbar = ({ rightText, rightLink }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>Money Monitor</div>
      <div className="navbar-right" onClick={() => navigate(rightLink)}>{rightText}</div>
    </nav>
  );
}

export default Navbar;