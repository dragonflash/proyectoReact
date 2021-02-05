import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import classNames from 'classnames';
import logo from '../assets/static/logo-platzi.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    //Se le pasa un objeto vacio para reiniciar el estado de user
    props.logoutRequest({});
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {
            hasUser ?
              <img src={gravatar(user.email)} alt={user.email} /> :
              <img src={userIcon} alt='Usuario' />
          }
          <p>Perfil</p>
        </div>
        <ul>
          {
            hasUser ?
              <li><a href='/'>{user.name}</a></li> :
              null
          }

          {
            hasUser ?
              <li><a href='#logout' onClick={handleLogout}>Cerrar Sesion</a></li> :
              <li><Link to='/login'>Iniciar Sesion</Link></li>
          }

        </ul>
      </div>
    </header>

  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
