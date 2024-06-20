import React, { useState, useEffect, useRef, Fragment } from "react";
import io from "socket.io-client";
import Adminsidebar from "../components/Adminsidebar";
import AdminTopnav from "../components/AdminTopnav";
import Adminfooter from "../components/Adminfooter";
import { useSelector } from "react-redux";
import { selectUserInfo, selectUserToken } from "../features/auth/authSlice";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("general");
  const [users, setUsers] = useState([]);
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_JS_BACK_URL, {
      auth: {
        token: userToken,
      },
    });
    socket.on("connect", () => {
      console.log("conected as: ", socket.id);
    });
    socket.on("NEW_MESSAGE", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("NEW_USER", (users) => {
      setUsers((a) => {
        const newUsers = users.filter((user) => user.key != socket.id);
        return newUsers;
      });
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_JS_BACK_URL}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              serviceUuid: "service.serviceUuid",
              from: userInfo.email,
              to: room || "service.guide.email",
              fromMe: true,
              body: input,
            }),
          }
        );
        const data = await response.json();
        setInput("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Fragment>
      <div id="wrapper">
        <Adminsidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />
            <div>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
              <form onSubmit={sendMessage}>
                <select value={room} onChange={(e) => setRoom(e.target.value)}>
                  <option key="general" value="General">
                    General
                  </option>
                  {users.map((user) => (
                    <option key={user.key} value={user.key}>
                      {user.placeholder}
                    </option>
                  ))}
                </select>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                />
                <button type="submit">Send</button>
              </form>
            </div>

            <Adminfooter />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Chat;
