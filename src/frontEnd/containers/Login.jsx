import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';
import '../assets/styles/components/Login.scss';
import Header from '../components/Header';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

//Se le pasa el parametro Props porque estamos conectando con redux
const Login = (props) => {
  const [form, setValues] = useState({
    email: ' ',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest(form);
    props.history.push('/');
  };
  return (
    <>
      <Header isLogin />
      <section className='login'>
        <div className='login__container'>
          <h2>Iniciar Sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button'>Iniciar Sesión</button>
            <div className='login__container--remember'>
              <label>
                <input type='checkbox' id='chbox1' value='checkbox' />
                Recuérdame
              </label>
              <a href='#'>Olvidé mi Contraseña</a>
            </div>
          </form>
          <section className='login__container--socialmedia'>
            <div>
              <img src={googleIcon} alt='Google' />
              Iniciar Sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter' />
              Iniciar Sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna Cuenta
            <Link to='/Register'>
              Regístrate
            </Link>
          </p>
        </div>
      </section>
    </>

  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
