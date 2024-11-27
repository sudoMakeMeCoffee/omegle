import React from "react";
import Navbar from "../components/Navbar";
import { IoSend } from "react-icons/io5";
import { AiOutlineEnter } from "react-icons/ai";

const Chat = () => {
  const messages = [
    { from: "You", message: "Hi! How are you?" },
    { from: "Stranger", message: "I'm good, thanks! How about you?" },
    { from: "You", message: "I'm doing well. What brings you here?" },
    { from: "Stranger", message: "Just looking to have a friendly chat." },
    { from: "You", message: "That sounds great! What's on your mind?" },
    { from: "Stranger", message: "I was thinking about learning a new hobby." },
    { from: "You", message: "Nice! Do you have any hobbies in mind?" },
    {
      from: "stranger",
      message: "Maybe painting or learning a musical instrument.",
    },
    { from: "You", message: "Hi! How are you?" },
    { from: "Stranger", message: "I'm good, thanks! How about you?" },
    { from: "You", message: "I'm doing well. What brings you here?" },
    { from: "Stranger", message: "Just looking to have a friendly chat." },
    { from: "You", message: "That sounds great! What's on your mind?" },
    { from: "Stranger", message: "I was thinking about learning a new hobby." },
    { from: "You", message: "Nice! Do you have any hobbies in mind?" },
    {
      from: "stranger",
      message: "Maybe painting or learning a musical instrument.",
    },
    { from: "You", message: "Hi! How are you?" },
    { from: "Stranger", message: "I'm good, thanks! How about you?" },
    { from: "You", message: "I'm doing well. What brings you here?" },
    { from: "Stranger", message: "Just looking to have a friendly chat." },
    { from: "You", message: "That sounds great! What's on your mind?" },
    { from: "Stranger", message: "I was thinking about learning a new hobby." },
    { from: "You", message: "Nice! Do you have any hobbies in mind?" },
    {
      from: "stranger",
      message: "Maybe painting or learning a musical instrument.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="p-2 pb-3 w-full min-h-[calc(100vh-70px)] flex gap-1">
        <div className="min-w-[30vw] border rounded-md hidden md:block">
          videio chat
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-1 border p-2 rounded-md flex-col gap-3 max-h-[calc(100vh-144px)] overflow-y-scroll">
            {messages.map((msg, i) => (
              <div key={i}>
                <span
                  className={`font-bold ${
                    msg.from === "You" ? "text-sky-600 " : "text-red-600 "
                  }`}
                >
                  {msg.from}:{" "}
                </span>
                <span className="font-normal text-pretty">{msg.message}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-1 w-full h-[50px]">
            <button className="border rounded-md h-full px-4 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold">Stop</span>
              <span className="text-xs text-sky-500">Esc</span>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="focus:outline-0 w-full border rounded-md h-full px-2"
            />
            <button className="border rounded-md h-full px-4 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold">Send</span>
              <span className="text-xs text-sky-500">Enter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
