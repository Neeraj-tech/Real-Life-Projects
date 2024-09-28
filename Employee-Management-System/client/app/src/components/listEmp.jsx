import Header from './header';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import EditEmp from './editEmp';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const ListEmp = function () {
  const [state, setState] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [empId, setEmpid] = useState('');
  const [cookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  //
  useEffect(() => {
    Axios.get('http://localhost:4000/listEmp', {
      headers: { Authorization: `Bearer ${cookies.access_token}` },
    })
      .then(res => {
        setState(res.data);
      })
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

  return (
    <div>
      <Header />
      <div>
        <h3> List Employee</h3>
        {state.length > 0 && (
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
                {state.map((e, idx) => {
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

export default ListEmp;
