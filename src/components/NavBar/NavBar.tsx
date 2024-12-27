import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', {
      'is-active has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
