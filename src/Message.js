import { useChannelMessage } from "@onehop/react";
import { useState } from "react";
import { m } from "framer-motion";
export const channelId = "channel_NTA3MzU3OTYwMjg3MzU1MDg";

export default function Messages() {
  const [chatMessages, setChatMessages] = useState([]);

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

  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="flex-1 overflow-auto w-full rounded-lg max-w-[30rem] shadow-md"
      style={{ backgroundColor: "#DAD3CC" }}
    >
		  {!chatMessages.length && (
			  <h3 className="text-center text-2xl font-bold">No messages yet</h3>
		)}
        {chatMessages.map((message, index) => (
          <div key={index} className="py-2 px-3 select-text">
            {message.msg && (
              <m.div initial="hidden" animate="show" exit="hidden" variants={variants} className="flex justify-end mb-2">
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
              <m.div initial="hidden" animate="show" exit="hidden" variants={variants}  className="flex mb-2">
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
          </div>
        ))}
    </div>
  );
}
