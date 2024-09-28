import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import AddEmp from './components/addEmp';
import EditEmp from './components/editEmp';
import Dashboard from './components/dashbord';
import ListEmp from './components/listEmp';

const App = function () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listEmp" element={<ListEmp />} />
          <Route path="/editEmp" element={<EditEmp />} />
          <Route path="/addEmp" element={<AddEmp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
