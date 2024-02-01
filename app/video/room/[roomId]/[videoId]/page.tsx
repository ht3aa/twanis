"use client";

import { parseJwt } from "@/app/lib/jwt";
import { useCookies } from "next-client-cookies";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function VideoRoom({ params }: { params: { videoId: string; roomId: string } }) {
  const cookies = useCookies();

  const [userInfo, setUserInfo]: [
    { userId: string; username: string; email: string; role: string },
    any,
  ] = useState({ userId: "", username: "", email: "", role: "" });
  const [socket, setSocket]: [Socket, any] = useState(io("http://192.168.0.122:8000"));
  const [isHost, setIsHost] = useState(false);
  const videoEl: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const [chatMessages, setChatMessages]: [Array<{ msg: string; username: string }>, any] = useState(
    [],
  );

  useEffect(() => {
    joinRoom();
    setUserInfo(parseJwt(cookies.get("accessToken")));
  }, []);

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("played", function (data) {
    if (!videoEl.current) return;

    if (videoEl.current.duration !== data && videoEl.current.currentTime !== data) {
      videoEl.current.currentTime = data;
      videoEl.current.play();
    }
  });

  socket.on("paused", function () {
    if (!videoEl.current) return;
    videoEl.current.pause();
  });

  socket.on("chating", function (data: { message: string; username: string }) {
    setChatMessages([...chatMessages, { msg: data.message, username: data.username }]);
  });

  socket.on("hostMember", function () {
    setIsHost(true);
  });

  function sendPlayMessage() {
    if (!isHost || !videoEl.current) return;

    socket.emit("play", {
      time: videoEl.current.currentTime,
      roomId: params.roomId,
    });
  }

  function sendPauseMessage() {
    if (!isHost) return;

    socket.emit("pause", params.roomId);
  }

  function sendChatMessage() {
    const input = document.getElementById("message") as HTMLInputElement;
    if (!input.value) return;
    socket.emit("chat", {
      message: input.value,
      roomId: params.roomId,
      username: userInfo.username,
    });

    input.value = "";
  }

  function joinRoom() {
    socket.emit("room", params.roomId);
  }

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <video
        id="videoEl"
        onPlay={sendPlayMessage}
        onPause={sendPauseMessage}
        width="500"
        controls={isHost}
        ref={videoEl}
        src={`http://192.168.0.122:8000/api/v1/video/${params.videoId}`}
      ></video>
      <div className="w-[50%] overflow-scroll h-full flex flex-col justify-between bg-gray-200">
        <div>
          {chatMessages.map(({ msg, username }, i) => (
            <div key={i} className="w-full p-2 my-2">
              <p className="bg-gray-700 text-white p-2">{username}</p>
              <span className="p-2">{msg}</span>
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
