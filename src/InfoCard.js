import React from "react";
import Messages from "./Message";
import { m } from "framer-motion";

const InfoCard = () => {
  const tabs = [
    {
      id: 0,
      label: "What Alan can do",
      content: (
        <div>
          <h1 className="capitalize font-semibold text-center animate-pulse text-xl">
            Try saying...
          </h1>
          <p className="flex justify-center gap-2 hover:animate-pulse">
            " Show me the <b>latest News</b>"
          </p>
          <p className="flex justify-center items-center gap-2 hover:animate-pulse">
            " Show me news from
            <div
              className="flex gap-1 py-[2px] px-[8px] 
            rounded-lg bg-blue-300 shadow-md"
            >
              <b>Fox News</b>-<span className="opacity-50">By Sources</span>
            </div>
            "
          </p>
          <p className="flex justify-center gap-2 hover:animate-pulse">
            " How's the <b>Weather</b> here "
          </p>
          <p className="flex justify-center gap-2 hover:animate-pulse">
            " How much is <b>Bitcoin</b> now "
          </p>
        </div>
      ),
    },
    {
      id: 1,
      label: "Alan's Live Coversations",
    },
  ];
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  return (
    <div className="flex flex-col md:w-[30rem] m-auto gap-8 justify-center w-full h-full">
      <m.h2 className="w-full text-4xl font-bold leading-none md:text-5xl">
        Welcome to News.js
      </m.h2>
      <nav className="p-2 rounded-lg bg-transparent">
        <ul className="flex gap-4">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`${
                item === selectedTab ? "selected" : ""
              } p-2 rounded-lg cursor-pointer w-max text-center`}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.label}`}
              {item.id === selectedTab.id ? (
                <m.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <m.div
          key={selectedTab ? selectedTab.label : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab?.id === 0 ? selectedTab.content : <Messages />}
        </m.div>
      </main>
    </div>
  );
};

export default InfoCard;
