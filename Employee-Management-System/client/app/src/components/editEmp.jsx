import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

const EditEmp = function (props) {
  const [state, setState] = useState({});
  const { empId, refresh } = props;
  const [cookies] = useCookies(['access_token']);

  useEffect(() => {
    Axios.get('http://localhost:4000/emp/' + empId, {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then(res => {
        setState(res.data);
      })
      .catch(err => alert(err));
  }, [empId, cookies]);

  const fetch = function () {
    Axios.post(
      'http://localhost:4000/emp/' + empId,
      { ...state },
      {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      }
    )
      .then(res => {
        alert(`${res.data.message}`);
        refresh();
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
  };
  //name, email, job title, department, hire date, and contact information.
  //<p> {JSON.stringify(state)}</p>
  return (
    <div className="container">
      <h5> Edit Employee </h5>
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
            value={state.fullName}
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
            value={state.email}
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
            value={state.jobTitle}
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
            value={state.department}
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
            value={state.hireDate}
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
            value={state.contactInfo}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEmp;
