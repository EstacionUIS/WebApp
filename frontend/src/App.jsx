// Dependencies
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import { Route, Routes, Link, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'; 

// CSS Style
import './App.css';

// Routes
import Home from './routes/home';
import About from './routes/about';
import Station from './routes/station';
import Observations from './routes/observations';
import Satellites from './routes/satellites';
import Images from './routes/images';

// LangSelector
import LanguageSelector from './language/components/langSelector';
import ThemeSelector from './language/components/themeSelector';

// Helper function to identify the active route
function MatchNavLink({ to, children }) {

  const match = useMatch(to);

  return (
    <NavLink as={Link} to={to} className={match? 'active' : ''}>
      {children}
    </NavLink>    
  );
}

MatchNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function App() {
  const { t } = useTranslation('routes');
  return (
    <div>
      {/* First NavBar */}
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand as={NavLink} to="/">{t('Brand')}</Navbar.Brand>
          <div className='selectors-container'>
            <LanguageSelector/>
            <ThemeSelector/>
          </div>
        </Container>
      </Navbar>
      {/* Second NavBar */}
      <Navbar bg="light" expand="lg"> 
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* NavLinks */}
              <MatchNavLink to="/">{t('home')}</MatchNavLink>
              <MatchNavLink to="/about">{t('about')}</MatchNavLink>
              <MatchNavLink to="/station">{t('station')}</MatchNavLink>
              <MatchNavLink to="/observations">{t('observations')}</MatchNavLink>
              <MatchNavLink to="/satellites">{t('satellites')}</MatchNavLink>
              <MatchNavLink to="/images">{t('images')}</MatchNavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Page Content */}
      <div className="content-wrapper">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/station' element={<Station/>}/>
          <Route path='/observations' element={<Observations/>}/>
          <Route path='/satellites' element={<Satellites/>}/>
          <Route path='/images' element={<Images/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
