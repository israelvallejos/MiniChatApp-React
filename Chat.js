import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">Live Chat</div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div className="message">
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div>
                  <p>{messageContent.time}</p>
                  <p>{messageContent.sender}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="type your message here.."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <br></br>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
