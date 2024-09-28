import Header from './header';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import EditEmp from './editEmp';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = function () {
  const [state, setState] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [empId, setEmpid] = useState('');
  const [cookies] = useCookies(['access_token']);
  const [customList, setCustomList] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  //
  useEffect(() => {
    Axios.get('http://localhost:4000/listEmp', {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then(res => setState(res.data))
      .catch(err => {
        alert(err.message);
        err.status === 401 && navigate('/signin');
      });
  }, [cookies, navigate]);

  const refresh = () => {
    setToggle(false);
    setEmpid('');
    Axios.get('http://localhost:4000/listEmp', {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then(res => setState(res.data))
      .catch(err => alert(err));
  };

  const editButtonHandler = uid => {
    setEmpid(uid);
    setToggle(true);
  };

  const deleteButtonHandler = uid => {
    uid &&
      Axios.delete('http://localhost:4000/emp/' + uid, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      })
        .then(res => {
          alert(res.data.message);
          refresh();
        })
        .catch(err => alert(err.message));
  };

  //filter & sort job title, department & hireDate
  const filterSubmitHandler = eve => {
    eve.preventDefault();
    let list = {
      jobTitle: [...new Set(state.map(el => el.jobTitle))],
      department: [...new Set(state.map(el => el.department))],
    };

    let filterList = {
      jobTitle: list.jobTitle.filter(
        el => eve.target[`btn-check-${el}`].checked
      ),
      department: list.department.filter(
        el => eve.target[`btn-check-${el}`].checked
      ),
    };

    const arrSort = items => {
      items.sort((a, b) => {
        const nameA = a[eve.target[`btn-emp-sort`].value].toUpperCase(); // ignore upper and lowercase
        const nameB = b[eve.target[`btn-emp-sort`].value].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      return items;
    };

    setCustomList(
      arrSort(
        state.filter(
          el =>
            filterList.jobTitle.includes(el.jobTitle) ||
            filterList.department.includes(el.department)
        )
      )
    );
  };

  // search based on name, jobtitle & department
  const onSearchChangeHandler = evt => {
    setSearch(evt);
  };

  const searchButtonHandler = () => {
    setCustomList([state.find(e => e.fullName === search)]);
  };

  return (
    <div>
      <Header />
      <div>
        <h3> Dashboard </h3>
        <div className="container">
          <form onSubmit={e => filterSubmitHandler(e)} className="form-control">
            <div className="container">
              <h4> Choose Job Title & Choose Department </h4>
              <div>
                <h4> Job Title </h4>
                <div className="btn-group">
                  {[...new Set(state.map(el => el.jobTitle))].map((el, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={`btn-check-${el}`}
                        value={el}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`btn-check-${el}`}
                      >
                        {el}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4> Department </h4>
                <div className="btn-group">
                  {[...new Set(state.map(el => el.department))].map(
                    (el, idx) => (
                      <div key={idx}>
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={`btn-check-${el}`}
                          value={el}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor={`btn-check-${el}`}
                        >
                          {el}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div>
              <h4> Sort </h4>
              <select className="form-select" id="btn-emp-sort">
                <option value="fullName">Name</option>
                <option value="jobTitle">Job Title</option>
                <option value="department">Department</option>
                <option value="hireDate">HireDate</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
          <h4>Search Employee by Name</h4>
          <div className="input-group mb-3">
            <span className="material-icons">search</span>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={evt => onSearchChangeHandler(evt.currentTarget.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={searchButtonHandler}
            >
              search
            </button>
          </div>
        </div>
        {customList.length > 0 && (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Job Title </th>
                  <th> Department </th>
                  <th> Hire Date </th>
                  <th> Contact Info </th>
                </tr>
              </thead>
              <tbody>
                {customList.map((e, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{e.fullName}</td>
                      <td>{e.email}</td>
                      <td>{e.jobTitle}</td>
                      <td>{e.department}</td>
                      <td>{e.hireDate}</td>
                      <td>{e.contactInfo}</td>
                      <td>
                        <button
                          type="submit"
                          onClick={() => editButtonHandler(e._id)}
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          type="submit"
                          onClick={() => deleteButtonHandler(e._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {toggle && <EditEmp empId={empId} refresh={refresh} />}
    </div>
  );
};

export default Dashboard;
