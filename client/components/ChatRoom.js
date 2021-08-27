import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
const faker = require("faker");

const socket = io.connect("http://localhost:8080");

const ChatRoom = (props) => {
  const { username } = props;

  return (
    <div className="join-container">
      <main className="join-main">
        <form action="chat.html">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <select name="username" id="username">
              <option value="UserName">{username}</option>
              <option value="Anon">Anon-{faker.random.word()}</option>
            </select>
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
    username: state.auth.username,
  };
};

export default connect(mapState)(ChatRoom);
