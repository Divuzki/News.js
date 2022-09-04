import { useChannelMessage } from "@onehop/react";
import { useState } from "react";
import { m } from "framer-motion";
export const channelId = "channel_NTA3MzU3OTYwMjg3MzU1MDg";

const SingleMessage = ({ message }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="py-2 px-3 select-text"
    >
      {message.msg && (
        <m.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants}
          className="flex justify-end mb-2"
        >
          <div
            className="rounded py-2 px-3"
            style={{ backgroundColor: "#E2F7CB" }}
          >
            <p className="text-sm mt-1">{message.msg.name}</p>
            <p className="text-right text-xs text-grey-dark mt-1">
              {message.msg.time}
            </p>
          </div>
        </m.div>
      )}
      {message.res && (
        <m.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={variants}
          className="flex mb-2"
        >
          <div
            className="rounded py-2 px-3"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <p className="text-sm text-purple">Alan</p>
            <p className="text-sm mt-1">{message.res.name}</p>
            <p className="text-right text-xs text-grey-dark mt-1">
              {message.res.time}
            </p>
          </div>
        </m.div>
      )}
    </m.div>
  );
};

export default function Messages() {
  const [chatMessages, setChatMessages] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  // in this example, USER_MESSAGE is an event that you'd send to the channel from your backend
  useChannelMessage(channelId, "NEW_USER_MESSAGE", (message) => {
    // this will be called every time the USER_MESSAGE event is sent to this channel
    setChatMessages((m) => [...m, message]);
    console.log(message);
  });
  useChannelMessage(channelId, "NEW_ALAN_MESSAGE", (message) => {
    // this will be called every time the USER_MESSAGE event is sent to this channel
    setChatMessages((m) => [...m, message]);
    console.log(message);
  });

  return (
    <>
      {!chatMessages.length && (
        <div className="overflow-hidden capitalize flex justify-center gap-2 text-[15px]">
          <span>don't understand, see the demostration </span>

          <button
            className="select-none text-indigo-400"
            onClick={() => setShowVideo(true)}
          >
            here
          </button>
          {showVideo && (
            <m.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center z-50">
                <div
                  onClick={() => setShowVideo(false)}
                  className="text-white w-max z-50 h-max rounded-lg cursor-pointer absolute md:top-4 bottom-10 left-5 underline p-2 bg-red-400"
                >
                  EXIT
                </div>
                <iframe
                  src="https://www.veed.io/embed/c5190597-a69a-4317-8685-ee0298944826"
                  width="744"
                  height="504"
                  frameborder="0"
                  title="video-demostration-of-realtime features"
                  className="z-50 rounded-lg"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowFullScreen
                ></iframe>
                <div
                  onClick={() => setShowVideo(false)}
                  className="absolute max-w-screen w-full h-full max-h-screen bg-black opacity-50 cursor-pointer
               left-0 bottom-0 right-0 top-0"
                ></div>
              </div>
            </m.div>
          )}
        </div>
      )}
      <span className="text-[10px] font-semibold opacity-80 w-full flex mb-4 justify-center text-center">
        - Note that nothing here is being saved -
      </span>
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden w-full rounded-lg max-w-[30rem] max-h-[30rem] shadow-md scrollbar-thin"
        style={{ backgroundColor: "#DAD3CC" }}
      >
        {!chatMessages.length && (
          <h3 className="text-center text-2xl font-bold py-2 px-4">
            No messages yet, be the first to ask
          </h3>
        )}
        {chatMessages.map((message, index) => (
          <SingleMessage key={index} message={message} />
        ))}
      </div>
    </>
  );
}
