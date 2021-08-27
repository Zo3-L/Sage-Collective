import React from "react";
import { connect } from "react-redux";
const faker = require("faker");

const ChatRoom = (props) => {
  const { username } = props;
  const anon = faker.random.word();

  return (
    <div className="join-container">
      <main className="join-main">
        {/* <form action="/chat"> */}
        <form action="chat.html">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            {!!username ? (
              <select name="username" id="username">
                <option value={`${username}`}>{username}</option>
                <option value={`Anon-${anon}`}>Anon-{anon}</option>
              </select>
            ) : (
              <select name="username" id="username">
                <option value={`Anon-${anon}`}>Anon-{anon}</option>
              </select>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select name="room" id="room">
              <option value="ProductivityHack">ProductivityHack</option>
              <option value="WFHLunchIdeas">WFHLunchIdeas</option>
              <option value="Networking">Networking</option>
              <option value="WFHStruggles">WFHStruggles</option>
              <option value="CreativityBoost">CreativityBoost</option>
              <option value="Random">Random</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

const mapState = (state) => {
  return {
    state,
    username: state.auth.username,
  };
};

export default connect(mapState)(ChatRoom);
