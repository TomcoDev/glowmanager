import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: '#170000',
        padding: '15px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ color: '#ECC6C0', fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 'bold' }}>
        GlowManager
      </div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/agendamientos" style={linkStyle}>Agendamientos</Link>
        <Link to="/clientes" style={linkStyle}>Clientes</Link>
        <Link to="/servicios" style={linkStyle}>Servicios</Link>
      </div>
    </motion.nav>
  );
};

const linkStyle = {
  color: '#C1B39A',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '500',
  transition: '0.3s'
};

export default Navbar;