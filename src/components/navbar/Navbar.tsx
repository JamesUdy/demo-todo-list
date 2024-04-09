import { Link, useLocation } from 'react-router-dom';
import { darkThemeLogo } from '../../assets';
import "./Navbar.scss"

const Navbar = () => {
  const links = [
    { 
      href: '/todo-form', 
      label: 'Form' 
    },
    { 
      href: '/task-repo', 
      label: 'Repositories' 
    },
  ];

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <section className='navbar-container'>
      <Link to='/todo-form' className='website-logo'>
        <div>
          <img loading="lazy" src={darkThemeLogo} alt="ToDo Sentinel Logo"/>
        </div>
        <span>To Do Sentinel</span>
      </Link>
        <div className='navLinks'>
          <section>
            {links.map((link) => (
              <Link className='navLink' key={link.href} to={link.href}>
                <span className={`${pathName === link.href ? 'underlined' : ''}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </section>
        </div>
    </section>
  );
};

export default Navbar;
