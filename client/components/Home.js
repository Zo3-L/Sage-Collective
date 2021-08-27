import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      {!!username ? (
        <div className="homeMsg">
          <h1>Welcome, {username}!</h1>
          <h4>
            <Link to="/chatroom">Access your community here</Link>
          </h4>
        </div>
      ) : (
        <div className="homeMsg">
          <h1>Welcome!</h1>
          <h4>
            <Link to="/chatroom">Access your community here</Link>
          </h4>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
