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
          <h2>Welcome, {username}!</h2>
          <h4>
            <Link to="/chatroom">Access your community here</Link>
          </h4>
        </div>
      ) : (
        <div className="homeMsg">
          <h2>Welcome!</h2>
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
