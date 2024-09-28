import Header from './header';
import { useState } from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

const AddEmp = function () {
  const [state, setState] = useState({});
  const [cookies] = useCookies('access_token');

  const fetch = function () {
    Axios.post(
      'http://localhost:4000/addEmp',
      { ...state },
      {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      }
    )
      .then(dbres => {
        alert(`${dbres.data.message}`);
        setState({});
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
    setState({});
  };
  //name, email, job title, department, hire date, and contact information.
  return (
    <div>
      <Header />
      <div className="container">
        <h5> Add Employee </h5>
        <form onSubmit={eve => handleSubmit(eve)} className="container">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              onChange={eve => onChangeHandler(eve)}
              value={state.fullName || ''}
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
              value={state.email || ''}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              name="jobTitle"
              onChange={eve => onChangeHandler(eve)}
              value={state.jobTitle || ''}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control"
              name="department"
              onChange={eve => onChangeHandler(eve)}
              value={state.department || ''}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hireDate" className="form-label">
              Hire date
            </label>
            <input
              type="date"
              className="form-control"
              name="hireDate"
              onChange={eve => onChangeHandler(eve)}
              value={state.hireDate || ''}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactInfo" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              name="contactInfo"
              onChange={eve => onChangeHandler(eve)}
              value={state.contactInfo || ''}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
