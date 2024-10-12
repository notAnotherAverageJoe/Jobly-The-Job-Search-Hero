import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../profile/UserContext";
import "../styles/Home.css"; // Import CSS file

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="home-container">
      {" "}
      {/* Use the class for styling */}
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {currentUser ? (
        <div className="welcome-message">
          {" "}
          {/* Add class for welcome message */}
          Welcome Back {currentUser.username || currentUser.firstName}
        </div>
      ) : (
        <p>
          <Link className="btn btn-primary font-weight-bold mr-3" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary font-weight-bold" to="/signup">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
};

export default Home;
