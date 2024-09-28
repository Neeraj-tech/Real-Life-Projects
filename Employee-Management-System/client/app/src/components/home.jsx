import Header from './header';

const Home = function () {
  return (
    <div>
      <Header />
      <div className="container">
        <h2> Employee Management System </h2>
        <h3> Features </h3>
        <ul>
          <li>
            <h4> Authorization </h4>
          </li>
          <li>
            <h4> Employee CRUD Operation </h4>
          </li>
          <li>
            <h4> Dashboard </h4>
          </li>
          <li>
            <h4> Search & Sort on Employees </h4>
          </li>
        </ul>
        <h4> Using MERN Stack</h4>
      </div>
    </div>
  );
};

export default Home;
