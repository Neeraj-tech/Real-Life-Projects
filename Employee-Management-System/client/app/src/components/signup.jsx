import Header from './header';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = function () {
  const [state, setState] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  const fetch = function () {
    Axios.post('http://localhost:4000/signup', { ...state })
      .then(dbres => {
        alert(`Signup successful! Please signin`);
        navigate('/signin');
      })
      .catch(err => {
        alert(err);
      });
  };

  const onChangeHandler = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(state);
    setState({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h5> Signup </h5>
        <form onSubmit={eve => handleSubmit(eve)} className="container">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="user name"
              onChange={eve => onChangeHandler(eve)}
            />
          </div>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={eve => onChangeHandler(eve)}
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
