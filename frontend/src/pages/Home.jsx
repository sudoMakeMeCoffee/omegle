import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import Video from "../components/Video";
const socket = io("http://localhost:5000");

const Home = () => {
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [matching, setMatching] = useState(false);
  const [whoStopped, setWhoStopped] = useState("");
  const [strangerTyping, setStrangerTyping] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("msg", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("pair", (user) => {
      setMatching(false);
      setTo(user);
      inputRef.current.focus();
    });

    socket.on("typing", () => {
      setStrangerTyping(true);
      setTimeout(() => {
        setStrangerTyping(false);
      }, 1600);
    });

    socket.on("userlist", (users) => {
      setConnectedUsers(users);
    });

    socket.on("stop", () => {
      setTo("");
      setMessages([]);
      setMatching(false);
      setWhoStopped("Stranger");
    });
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [to]);

  const send = () => {
    if (message !== "") {
      setMessages((prev) => [
        ...prev,
        {
          message: message,
          from: socket.id,
          to: to,
        },
      ]);
      socket.emit("msg", {
        message: message,
        from: socket.id,
        to: to,
      });

      setMessage("");
      inputRef.current.focus();
    }
  };

  const startStopMessaging = () => {
    if (to === "") {
      setMatching(true);
      socket.emit("start", socket.id);
    } else {
      socket.emit("stop", {
        from: socket.id,
        to: to,
      });
      setWhoStopped("You");
      setTo("");
      setMessage("");
      setMessages([]);
      setMatching(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      from: socket.id,
      to: to,
    });
  };

  return (
    <>
      <Navbar />

      <div className="p-2 pb-3 w-full min-h-[calc(100vh-70px)] flex gap-1">
        <div className="min-w-[30vw] border rounded-md hidden md:block">
          {/* <Video socket={socket} />  */}
          Video Call - TODO
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-1 border p-2 rounded-md flex-col gap-2 max-h-[calc(100vh-144px)] overflow-y-scroll">
            {matching ? (
              <div className="flex items-center gap-1 w-full h-full justify-center">
                <span className="text-sm font-semibold">
                  Connecting to a stranger.....
                </span>
              </div>
            ) : to ? (
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">
                  Connected to a stranger. Say Hi
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 w-full h-full justify-center">
                {whoStopped !== "" && (
                  <div className="flex items-end gap-1 text-red-600">
                    <span className="text-sm font-semibold">
                      {whoStopped} disconnected
                    </span>
                  </div>
                )}
                <button
                  className="w-[200px] px-3 py-2 rounded-md bg-sky-500 text-white font-semibold"
                  onClick={startStopMessaging}
                >
                  Connect to a stranger
                </button>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="flex gap-1 items-center">
                <span
                  className={`font-bold ${
                    msg.from === socket.id ? "text-sky-600 " : "text-red-600 "
                  }`}
                >
                  {msg.from === socket.id ? "You" : "Stranger"}
                </span>
                <span className="font-normal text-pretty">{msg.message}</span>
              </div>
            ))}

            {strangerTyping && (
              <div className="flex items-end gap-1 text-red-600">
                <span className="text-sm font-semibold">
                  Stranger is Typing.....
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-1 w-full h-[50px]">
            <button
              className="border rounded-md h-full px-4 flex flex-col items-center justify-center"
              onClick={startStopMessaging}
            >
              <span className="text-sm font-semibold">
                {to ? "Stop" : "Start"}
              </span>
              <span className="text-xs text-sky-500">Esc</span>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="focus:outline-0 w-full border rounded-md h-full px-2"
              value={message}
              onChange={handleInputChange}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }

                if (e.key === "Escape") {
                  startStopMessaging();
                }
              }}
              disabled={matching}
            />
            <button
              className="border rounded-md h-full px-4 flex flex-col items-center justify-center"
              onClick={send}
            >
              <span className="text-sm font-semibold">Send</span>
              <span className="text-xs text-sky-500">Enter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
