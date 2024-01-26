"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function VideoRoom({ params }: { params: { videoId: string, roomId: string } }) {
  let socket: Socket;
  const videoEl: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const [chatMessages, setChatMessages]: [Array<{ msg: string }>, any] = useState([]);

  socket = io("http://192.168.0.122:8000");
  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("played", function (data) {
    if (!videoEl.current) return;

    console.log(data)
    if (videoEl.current.duration !== data && videoEl.current.currentTime !== data) {
      videoEl.current.currentTime = data;
      videoEl.current.play();
    }
  });

  socket.on("paused", function () {
    if (!videoEl.current) return;
    videoEl.current.pause();
  });

  socket.on("chating", function (data) {
    setChatMessages([...chatMessages, { msg: data }]);
  });

  function sendPlayMessage() {
    if (!videoEl.current) return;
    console.log("play");
    socket.emit("play", {
      time: videoEl.current.currentTime,
      roomId: params.roomId
    });
  }

  function sendPauseMessage() {
    console.log("pause");
    socket.emit("pause", params.roomId);
  }

  function sendChatMessage() {
    const input = document.getElementById("message") as HTMLInputElement;
    if (!input.value) return;
    socket.emit("chat", {
      message: input.value,
      roomId: params.roomId
    });

    input.value = "";
  }

  function joinRoom() {
    socket.emit("room", params.roomId);
  }

  useEffect(() => {
    joinRoom();
  })

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <video
        id="videoEl"
        onPlay={sendPlayMessage}
        onPause={sendPauseMessage}
        width="500"
        controls
        ref={videoEl}
        src={`http://192.168.0.122:8000/api/v1/video/${params.videoId}`}
      ></video>
      <div className="w-[50%] overflow-scroll h-full flex flex-col justify-between bg-gray-200">
        <div>
          {chatMessages.map(({ msg }) => (
            <div className="w-full bg-gray-300 p-2 my-2">
              <span>{msg}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 ">
          <input
            id="message"
            className="w-full border border-gray-800 p-2 mb-2"
            type="text"
            placeholder="Enter your message"
          />
          <button onClick={sendChatMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
