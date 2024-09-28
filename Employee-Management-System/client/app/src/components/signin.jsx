import Header from './header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

const Signin = function () {
  const [state, setState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['access_token']);

  const navigate = useNavigate();

  const fetch = function () {
    Axios.post('http://localhost:4000/signin', { ...state })
      .then(res => {
        let expires = new Date();
        expires.setTime(
          expires.getTime() + res.data.expires_in * 1000 * 60 * 60 * 24
        );
        setCookie('access_token', res.data.access_token, {
          path: '/',
          expires,
        });
        navigate('/dashboard');
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  };

  const onChangeHandler = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(state);
    //setState({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h5> Signin </h5>
        <form
          onSubmit={eve => handleSubmit(eve)}
          className="form-control needs-validation"
        >
          <div className={error ? 'is-invalid' : ''}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
                onChange={eve => onChangeHandler(eve)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={eve => onChangeHandler(eve)}
              />
            </div>
          </div>
          <div className="invalid-feedback">{error} </div>
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
